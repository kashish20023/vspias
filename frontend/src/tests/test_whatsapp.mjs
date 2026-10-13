import assert from 'node:assert/strict';

// Test WhatsApp builder and link verification
function testWhatsAppBuilder() {
  console.log('Testing WhatsApp URL builder logic...');

  const DEFAULT_PHONE = '919783133333';

  function buildWhatsAppUrl(message, phone = DEFAULT_PHONE) {
    const cleanPhone = phone.replace(/\D/g, '');
    if (!message || !message.trim()) {
      return `https://wa.me/${cleanPhone}`;
    }
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  }

  // 1. Default phone with no message
  assert.equal(buildWhatsAppUrl(''), 'https://wa.me/919783133333');
  assert.equal(buildWhatsAppUrl(undefined), 'https://wa.me/919783133333');

  // 2. Encoded message
  const msg = 'Hello VSPIAS, I would like to discuss my requirements.';
  const url = buildWhatsAppUrl(msg);
  assert.equal(url, 'https://wa.me/919783133333?text=Hello%20VSPIAS%2C%20I%20would%20like%20to%20discuss%20my%20requirements.');

  // 3. Form draft multi-line message
  const multiLine = 'Subject: Test\n\nName: John Doe';
  const multiUrl = buildWhatsAppUrl(multiLine);
  assert.ok(multiUrl.startsWith('https://wa.me/919783133333?text='));
  assert.ok(multiUrl.includes('Subject%3A%20Test%0A%0AName%3A%20John%20Doe'));

  // 4. International dialing validation
  assert.ok(url.includes('919783133333'), 'Must contain India country code +91');
  assert.ok(!url.includes('+'), 'wa.me standard format does not use + sign in pathname');

  console.log('All WhatsApp builder unit tests passed successfully.');
}

testWhatsAppBuilder();
