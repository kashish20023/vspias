async function verify() {
  const BASE = process.env.BASE_URL || 'http://localhost:3000';
  
  // 1. Routes
  const routes = ['/', '/paper-bags', '/automation', '/contact'];
  for (const r of routes) {
    const res = await fetch(BASE + r);
    const html = await res.text();
    console.log(r, 'status:', res.status, 'HTML length:', html.length);
  }

  // 2. Home content check
  const homeHtml = await (await fetch(BASE + '/')).text();
  const hasH1 = homeHtml.includes('id="company-hero"');
  const hasH2 = homeHtml.includes('id="automation-rail"');
  const hasH3 = homeHtml.includes('id="paper-rail"');
  const hasH4 = homeHtml.includes('id="benefits"');
  const hasH5 = homeHtml.includes('id="division-solutions"');
  const hasH6 = homeHtml.includes('id="enquiry-connect"');
  console.log('Home Blocks H1-H6:', { hasH1, hasH2, hasH3, hasH4, hasH5, hasH6 });

  // Disallowed sections on Home
  const disallowedHome = ['id="bag-range-showcase"', 'id="material-details"', 'id="custom-journey"', 'id="portfolio-section"'];
  const hasDisallowedHome = disallowedHome.some(d => homeHtml.includes(d));
  console.log('Home has disallowed long sections:', hasDisallowedHome);

  // 3. Paper Bags content check
  const paperHtml = await (await fetch(BASE + '/paper-bags')).text();
  const paperHasBagHero = paperHtml.includes('id="home-hero"');
  const paperHasShowcase = paperHtml.includes('id="bag-showcase"');
  const paperHasAutomationPromo = paperHtml.includes('Altivar VFD & drives');
  console.log('Paper page content check:', { paperHasBagHero, paperHasShowcase, paperHasAutomationPromo });

  // 4. Automation content check
  const autoHtml = await (await fetch(BASE + '/automation')).text();
  const autoHasAutomationHero = autoHtml.includes('id="automation-hero"');
  const autoHasPortfolio = autoHtml.includes('id="portfolio-section"');
  const autoHasPaperPromo = autoHtml.includes('Paper bag packaging styles to begin your conversation');
  console.log('Automation page content check:', { autoHasAutomationHero, autoHasPortfolio, autoHasPaperPromo });

  // 5. Motion components
  const hasNawsome = homeHtml.includes('vsp-enquiry-button');
  const contactHtml = await (await fetch(BASE + '/contact')).text();
  const has0xnihilism = contactHtml.includes('vsp-enquiry-surface') && contactHtml.includes('vsp-enquiry-ribbon');
  const hasUtilitybend = homeHtml.includes('vsp-variable-headline');
  console.log('Motion components active:', { hasNawsome, has0xnihilism, hasUtilitybend });
}

verify().catch(console.error);
