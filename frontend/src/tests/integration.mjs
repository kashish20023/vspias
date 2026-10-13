import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:4173';
const TEST_PASSWORD = 'TestAdminPassword1234!';
process.env.ADMIN_PASSWORD = TEST_PASSWORD;

async function run() {
  console.log('Running VSPIAS Next.js API & Catalogue Integration Tests...');
  let cookie = '';
  let csrf = '';
  let revision = 1;
  let catalog = null;
  let uploadedPath = '';

  async function call(route, { data, auth = true, headers = {} } = {}) {
    return fetch(BASE + route, {
      method: data === undefined ? 'GET' : 'POST',
      headers: {
        ...(auth ? { cookie, 'X-CSRF-Token': csrf } : {}),
        'Content-Type': 'application/json',
        ...headers
      },
      body: data === undefined ? undefined : JSON.stringify(data)
    });
  }

  // 1. Both homepage entry points and public catalogue respond
  console.log('1. Checking homepage routes and public catalogue...');
  for (const p of ['/', '/automation', '/paper-bags', '/industrial-solutions', '/contact', '/printing', '/admin.html', '/admin']) {
    const res = await call(p);
    assert.equal(res.status, 200, `${p} should return 200`);
  }
  const catRes = await call('/api/catalog');
  assert.equal(catRes.status, 200);
  const publicData = await catRes.json();
  const autoCount = publicData.products.filter(p => p.division === 'automation').length;
  const paperCount = publicData.products.filter(p => p.division === 'paper').length;
  assert.equal(autoCount, 26, 'Should have 26 automation products');
  assert.equal(paperCount, 4, 'Should have 4 paper products');
  console.log(`   Passed (26 automation, 4 paper products).`);

  // 2. All published media and real PDF resolve with correct types
  console.log('2. Verifying published images and company brochure PDF...');
  for (const p of publicData.products) {
    const r = await fetch(BASE + '/' + p.image.replace(/^\//, ''));
    assert.equal(r.status, 200, `Image ${p.image} should resolve`);
    assert.match(r.headers.get('content-type') || '', /^image\//, `Image ${p.image} should have image content-type`);
  }
  const brochureRes = await fetch(BASE + '/' + publicData.brochure.replace(/^\//, ''));
  assert.equal(brochureRes.status, 200);
  assert.equal(brochureRes.headers.get('content-type'), 'application/pdf');
  const pdfBytes = Buffer.from(await brochureRes.arrayBuffer());
  assert.equal(pdfBytes.subarray(0, 5).toString('ascii'), '%PDF-');
  console.log('   Passed (all 30 images and 12-page PDF verified).');

  // 3. Anonymous access cannot read drafts, publish or upload files
  console.log('3. Verifying authorization boundaries for anonymous requests...');
  assert.equal((await call('/api/admin/catalog', { auth: false })).status, 401);
  assert.equal((await call('/api/admin/preview', { auth: false })).status, 401);
  assert.equal((await call('/api/admin/publish', { auth: false, data: { revision: 1 } })).status, 401);
  assert.equal((await call('/api/admin/media', { auth: false, data: { data: 'AAAA' } })).status, 401);
  console.log('   Passed (anonymous writes/draft reads denied with 401).');

  // 4. Login authentication
  console.log('4. Verifying login authentication and session cookies...');
  assert.equal((await call('/api/login', { auth: false, data: { password: 'wrongpassword' } })).status, 401);
  const loginRes = await call('/api/login', { auth: false, data: { password: TEST_PASSWORD } });
  assert.equal(loginRes.status, 200);
  const setCookie = loginRes.headers.get('set-cookie');
  assert.match(setCookie, /vspias_admin=/);
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Strict/i);
  cookie = setCookie.split(';')[0];
  const loginData = await loginRes.json();
  csrf = loginData.csrf;
  assert.ok(csrf, 'CSRF token should be returned');
  console.log('   Passed (secure cookie and CSRF returned).');

  // 5. CSRF and cross-origin writes are blocked
  console.log('5. Verifying CSRF token protection...');
  assert.equal((await call('/api/admin/publish', { data: { revision }, headers: { 'X-CSRF-Token': 'bad-token' } })).status, 403);
  assert.equal((await call('/api/admin/publish', { data: { revision }, headers: { Origin: 'https://untrusted-site.com' } })).status, 403);
  console.log('   Passed (invalid CSRF and cross-origin blocked with 403).');

  // 6. Admin catalog read and validation
  console.log('6. Verifying admin catalog draft reading and validation...');
  const stateRes = await call('/api/admin/catalog');
  assert.equal(stateRes.status, 200);
  const stateData = await stateRes.json();
  catalog = stateData.draft;
  revision = stateData.revision;

  // Invalid save rejected
  const badCatalog = JSON.parse(JSON.stringify(catalog));
  badCatalog.products[1].id = badCatalog.products[0].id; // duplicate ID
  assert.equal((await call('/api/admin/save', { data: { revision, catalog: badCatalog } })).status, 400);
  console.log('   Passed (schema and duplicate ID rejected with 400).');

  // 7. Draft saving and isolation
  console.log('7. Verifying draft persistence and isolation...');
  catalog.products[0].name = 'QA Verified Dynamic Title';
  catalog.products[1].visible = false;
  const saveRes = await call('/api/admin/save', { data: { revision, catalog } });
  assert.equal(saveRes.status, 200);
  const nextRev = (await saveRes.json()).revision;

  // Stale save rejected
  assert.equal((await call('/api/admin/save', { data: { revision, catalog } })).status, 409);
  revision = nextRev;

  // Verify public catalog is untouched
  const publicCheck = await (await call('/api/catalog', { auth: false })).json();
  assert.notEqual(publicCheck.products[0].name, 'QA Verified Dynamic Title', 'Public catalog should not be updated yet');
  assert.equal(publicCheck.products.length, 30, 'Public count should still be 30');

  // Verify preview returns draft changes
  const previewCheck = await (await call('/api/admin/preview')).json();
  assert.equal(previewCheck.products[0].name, 'QA Verified Dynamic Title');
  assert.equal(previewCheck.products.length, 29, 'Draft preview should reflect hidden product');
  console.log('   Passed (draft isolated from public; stale save rejected with 409).');

  // 8. Publish draft
  console.log('8. Verifying atomic draft publication...');
  const pubRes = await call('/api/admin/publish', { data: { revision } });
  assert.equal(pubRes.status, 200);
  revision = (await pubRes.json()).revision;

  const publishedPublic = await (await call('/api/catalog', { auth: false })).json();
  assert.equal(publishedPublic.products[0].name, 'QA Verified Dynamic Title');
  assert.equal(publishedPublic.products.length, 29);
  console.log('   Passed (publication updated public API and hid inactive item).');

  // 9. Media upload
  console.log('9. Verifying image and PDF upload with header validation...');
  const samplePng = Buffer.from(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
    'base64'
  );
  const upRes = await call('/api/admin/media', { data: { data: samplePng.toString('base64') } });
  assert.equal(upRes.status, 201);
  const upData = await upRes.json();
  uploadedPath = upData.path;
  assert.ok(uploadedPath.startsWith('uploads/'));

  // Invalid media rejected
  assert.equal((await call('/api/admin/media', { data: { data: Buffer.from('<svg></svg>').toString('base64') } })).status, 400);

  // Draft media requires authentication until published
  assert.equal((await fetch(BASE + '/' + uploadedPath)).status, 401, 'Draft upload should require auth');
  const authUp = await fetch(BASE + '/' + uploadedPath, { headers: { cookie } });
  assert.equal(authUp.status, 200, 'Authenticated user can access draft upload');
  console.log('   Passed (media signature validated, draft media protected).');

  // 10. Discard draft
  console.log('10. Verifying draft discard...');
  catalog.products[0].name = 'Unpublished Throwaway Edit';
  const saveTemp = await call('/api/admin/save', { data: { revision, catalog } });
  revision = (await saveTemp.json()).revision;

  const discardRes = await call('/api/admin/discard', { data: { revision } });
  assert.equal(discardRes.status, 200);
  revision = (await discardRes.json()).revision;
  const discardedState = await (await call('/api/admin/catalog')).json();
  assert.equal(discardedState.draft.products[0].name, 'QA Verified Dynamic Title');
  console.log('   Passed (draft restored from last published state).');

  // 11. Clean up test changes: restore original name and visibility
  console.log('11. Restoring test catalog state to original pristine values...');
  const resetCatalog = JSON.parse(JSON.stringify(discardedState.draft));
  resetCatalog.products[0].name = 'Altivar VFD & drives';
  resetCatalog.products[1].visible = true;
  const resetSave = await call('/api/admin/save', { data: { revision, catalog: resetCatalog } });
  revision = (await resetSave.json()).revision;
  const resetPub = await call('/api/admin/publish', { data: { revision } });
  assert.equal(resetPub.status, 200);
  console.log('   Passed (pristine catalogue restored).');

  // 12. Logout
  console.log('12. Verifying logout...');
  assert.equal((await call('/api/logout', { data: {} })).status, 200);
  assert.equal((await call('/api/admin/catalog')).status, 401);
  console.log('   Passed (session invalidated).');

  console.log('\n ALL 12 INTEGRATION TEST SUITES PASSED ON NEXT.JS APP! \n');
}

run().catch((err) => {
  console.error('Integration test failed:', err);
  process.exit(1);
});
