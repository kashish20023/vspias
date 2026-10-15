/** VSPIAS Bag Studio. Browser-only mount; safe to import from an SSR application. */
export const PAPER_COLOURS = Object.freeze([
  { id: 'kraft', label: 'Natural kraft', value: '#bc9465' },
  { id: 'ivory', label: 'Warm ivory', value: '#eee9d8' },
  { id: 'forest', label: 'Forest green', value: '#193b2d' },
  { id: 'sage', label: 'Soft sage', value: '#a9b69c' }
]);
export const PRINT_COLOURS = Object.freeze([
  { id: 'forest', label: 'Forest ink', value: '#193b2d' },
  { id: 'ivory', label: 'Ivory ink', value: '#fffdf3' },
  { id: 'charcoal', label: 'Charcoal ink', value: '#222822' }
]);
const SHAPES = Object.freeze({ classic: [210, 264, 76], tall: [182, 282, 70], wide: [242, 210, 88] });
export const DEFAULT_DESIGN = Object.freeze({ version: 1, paper: 'kraft', print: 'forest', brand: 'YOUR BRAND', pattern: 'plain', handle: 'rope', shape: 'classic' });
const choose = (list, key, fallback) => list.some(item => item.id === key) ? key : fallback;
export function normalizeDesign(value = {}) {
  const v = value && typeof value === 'object' ? value : {};
  return {
    version: 1,
    paper: choose(PAPER_COLOURS, v.paper, DEFAULT_DESIGN.paper),
    print: choose(PRINT_COLOURS, v.print, DEFAULT_DESIGN.print),
    brand: Array.from(typeof v.brand === 'string' ? v.brand.replace(/[\u0000-\u001f\u007f]/g, '') : DEFAULT_DESIGN.brand).slice(0, 28).join(''),
    pattern: ['plain', 'dots', 'stripes'].includes(v.pattern) ? v.pattern : 'plain',
    handle: ['rope', 'flat'].includes(v.handle) ? v.handle : 'rope',
    shape: Object.hasOwn(SHAPES, v.shape) ? v.shape : 'classic'
  };
}
export function designBrief(value) {
  const d = normalizeDesign(value);
  return { ...d, paperColour: PAPER_COLOURS.find(x => x.id === d.paper).value, printColour: PRINT_COLOURS.find(x => x.id === d.print).value, note: 'Illustrative visual preference only. Dimensions, material, print, handles, quantity and availability must be confirmed before manufacture.' };
}

let instance = 0;
export function mountBagStudio(root, options = {}) {
  if (!root || typeof root.querySelector !== 'function') throw new TypeError('A DOM element is required.');
  const doc = root.ownerDocument;
  const win = doc.defaultView;
  const id = `vspias-bag-${++instance}`;
  const initial = normalizeDesign(options.initialDesign);
  let state = { ...initial }, angle = -24, automatic = true, visible = true, hovering = false, focused = false;
  let dragging = false, pointerId = null, startX = 0, startAngle = 0, frame = 0, last = 0, dead = false;
  const events = [];
  const on = (target, event, handler, opts) => { target.addEventListener(event, handler, opts); events.push(() => target.removeEventListener(event, handler, opts)); };
  const query = selector => root.querySelector(selector);
  const swatches = (items, key) => items.map(c => `<button type="button" class="bs-swatch" data-key="${key}" data-value="${c.id}" aria-pressed="false"><i style="--swatch:${c.value}" aria-hidden="true"></i><span>${c.label}</span></button>`).join('');
  const surface = side => `<div class="bs-face bs-${side}"><div class="bs-fold" aria-hidden="true"></div><div class="bs-handle" aria-hidden="true"></div><div class="bs-print"><span class="bs-mark" aria-hidden="true">V</span><span data-brand></span><span class="bs-print-rule" aria-hidden="true"></span><small>MADE TO CARRY YOUR STORY</small></div></div>`;
  root.classList.add('vs-bag-studio');
  root.innerHTML = `<div class="bs-layout">
    <div class="bs-preview">
      <div class="bs-preview-top"><span class="bs-kicker">THE BAG STUDIO</span><span class="bs-tag">360° preview</span></div>
      <div class="bs-stage" tabindex="0" role="group" aria-label="Rotating paper bag preview. Drag horizontally, or use Left and Right arrow keys to rotate. Home shows the front.">
        <div class="bs-floor" aria-hidden="true"></div>
        <div class="bs-camera" aria-hidden="true"><div class="bs-model">${surface('front')}${surface('back')}<div class="bs-face bs-left"><span></span></div><div class="bs-face bs-right"><span></span></div><div class="bs-bottom"></div></div></div>
      </div>
      <div class="bs-view-controls"><button type="button" data-action="rotate-left" aria-label="Rotate bag left">←</button><button type="button" data-action="rotate-right" aria-label="Rotate bag right">→</button><button type="button" data-action="auto" aria-pressed="true">Pause rotation</button><button type="button" data-action="front">Front view</button></div>
      <label class="bs-angle" for="${id}-angle">Rotation <input id="${id}-angle" data-angle type="range" min="-180" max="180" step="1" value="-24" /><output data-angle-value>-24°</output></label>
      <p class="bs-hint">Drag to explore. Every side, every detail.</p>
    </div>
    <div class="bs-settings">
      <p class="bs-kicker">MAKE IT YOURS</p><h2>Design your<br><em>own bag.</em></h2>
      <p class="bs-intro">A little colour. Your name. A bag that feels like your brand.</p>
      <fieldset><legend>01 <span>Paper colour</span></legend><div class="bs-swatches">${swatches(PAPER_COLOURS, 'paper')}</div></fieldset>
      <fieldset><legend>02 <span>Print colour</span></legend><div class="bs-swatches bs-print-swatches">${swatches(PRINT_COLOURS, 'print')}</div></fieldset>
      <label class="bs-field" for="${id}-brand">03 <span>Your brand name</span><input id="${id}-brand" data-brand-input type="text" maxlength="56" autocomplete="off" spellcheck="false" aria-describedby="${id}-brand-help" /></label>
      <small id="${id}-brand-help" class="bs-help">Up to 28 characters. Preview text stays within the print area.</small>
      <div class="bs-setting-row"><label class="bs-field" for="${id}-pattern">Pattern<select id="${id}-pattern" data-select="pattern"><option value="plain">Minimal</option><option value="dots">Micro dots</option><option value="stripes">Fine stripes</option></select></label><label class="bs-field" for="${id}-handle">Handle<select id="${id}-handle" data-select="handle"><option value="rope">Rope</option><option value="flat">Flat paper</option></select></label><label class="bs-field" for="${id}-shape">Proportions<select id="${id}-shape" data-select="shape"><option value="classic">Classic</option><option value="tall">Tall</option><option value="wide">Wide</option></select></label></div>
      <p class="bs-summary" data-summary></p><p class="bs-help" data-contrast hidden>For clearer lettering, choose a contrasting print colour.</p>
      <div class="bs-actions"><button type="button" class="bs-primary" data-action="download">Download design brief <span aria-hidden="true">↗</span></button><button type="button" class="bs-reset" data-action="reset">Reset</button></div>
      <button type="button" class="bs-quote" data-action="quote" hidden>Use this design in my enquiry →</button>
      <p class="bs-disclaimer">An illustrative design preview. Final materials, colours and production details are confirmed with your quotation.</p>
      <span class="bs-sr" data-status role="status" aria-live="polite"></span>
    </div></div>`;
  const stage = query('.bs-stage'), model = query('.bs-model'), camera = query('.bs-camera');
  const media = win.matchMedia('(prefers-reduced-motion: reduce)');
  let reduced = media.matches;
  if (reduced) automatic = false;
  if (typeof options.onRequestQuote === 'function') query('[data-action="quote"]').hidden = false;
  function syncAngle() {
    angle = ((angle + 180) % 360 + 360) % 360 - 180;
    model.style.transform = `rotateY(${angle}deg)`;
    query('[data-angle]').value = String(Math.round(angle));
    query('[data-angle-value]').textContent = `${Math.round(angle)}°`;
  }
  function syncPlay() {
    const button = query('[data-action="auto"]');
    button.textContent = automatic ? 'Pause rotation' : 'Auto rotate';
    button.setAttribute('aria-pressed', String(automatic));
  }
  function shouldRun() { return !dead && automatic && visible && !hovering && !focused && !dragging && !doc.hidden; }
  function tick(now) {
    frame = 0;
    if (!shouldRun()) { last = 0; return; }
    if (last) angle += Math.min(now - last, 60) * .009;
    last = now;
    syncAngle();
    frame = win.requestAnimationFrame(tick);
  }
  function schedule() {
    if (!shouldRun()) { if (frame) win.cancelAnimationFrame(frame); frame = 0; last = 0; }
    else if (!frame) frame = win.requestAnimationFrame(tick);
  }
  function stopAutomatic() { automatic = false; syncPlay(); schedule(); }
  function fit() {
    const width = stage.clientWidth;
    camera.style.setProperty('--bs-scale', String(Math.min(1, Math.max(.35, (width - 56) / 330))));
  }
  function render(notify = true) {
    const paper = PAPER_COLOURS.find(x => x.id === state.paper), ink = PRINT_COLOURS.find(x => x.id === state.print);
    const [w, h, d] = SHAPES[state.shape];
    model.style.setProperty('--bs-paper', paper.value); model.style.setProperty('--bs-ink', ink.value);
    model.style.setProperty('--bs-w', `${w}px`); model.style.setProperty('--bs-h', `${h}px`); model.style.setProperty('--bs-d', `${d}px`);
    model.dataset.pattern = state.pattern; model.dataset.handle = state.handle;
    root.querySelectorAll('[data-brand]').forEach(node => { node.textContent = state.brand; node.style.fontSize = `${Math.min(21, Math.max(7, (w - 42) / (Math.max(1, Array.from(state.brand).length) * .85)))}px`; });
    query('[data-brand-input]').value = state.brand;
    root.querySelectorAll('[data-key]').forEach(button => button.setAttribute('aria-pressed', String(state[button.dataset.key] === button.dataset.value)));
    root.querySelectorAll('[data-select]').forEach(select => { select.value = state[select.dataset.select]; });
    query('[data-summary]').textContent = `${paper.label} · ${ink.label} · ${state.handle === 'rope' ? 'Rope' : 'Flat paper'} handle`;
    query('[data-contrast]').hidden = !((state.paper === 'forest' && state.print === 'forest') || (state.paper === 'ivory' && state.print === 'ivory'));
    syncAngle(); syncPlay(); fit();
    if (notify && typeof options.onDesignChange === 'function') options.onDesignChange(designBrief(state));
  }
  function setDesign(value) { state = normalizeDesign(value); render(); }
  function change(value) { setDesign({ ...state, ...value }); }
  function rotate(amount) { stopAutomatic(); angle += amount; syncAngle(); }
  on(root, 'click', event => {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.key) { change({ [button.dataset.key]: button.dataset.value }); return; }
    switch (button.dataset.action) {
      case 'rotate-left': rotate(-30); break;
      case 'rotate-right': rotate(30); break;
      case 'auto': automatic = !automatic; syncPlay(); schedule(); break;
      case 'front': stopAutomatic(); angle = 0; syncAngle(); break;
      case 'reset': stopAutomatic(); angle = -24; setDesign(initial); query('[data-status]').textContent = 'Design reset.'; break;
      case 'quote': if (typeof options.onRequestQuote === 'function') options.onRequestQuote(designBrief(state)); break;
      case 'download': {
        const blob = new win.Blob([JSON.stringify(designBrief(state), null, 2)], { type: 'application/json' });
        const url = win.URL.createObjectURL(blob), a = doc.createElement('a');
        a.href = url; a.download = 'VSPIAS-bag-design.json'; doc.body.append(a); a.click(); a.remove();
        win.setTimeout(() => win.URL.revokeObjectURL(url), 1000);
        query('[data-status]').textContent = 'Your design brief has been downloaded. No enquiry has been sent.';
        break;
      }
    }
  });
  on(query('[data-brand-input]'), 'input', event => change({ brand: event.target.value }));
  root.querySelectorAll('[data-select]').forEach(select => on(select, 'change', () => change({ [select.dataset.select]: select.value })));
  on(query('[data-angle]'), 'input', event => { stopAutomatic(); angle = Number(event.target.value); syncAngle(); });
  on(stage, 'keydown', event => {
    if (['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) {
      event.preventDefault(); if (event.key === 'Home') { stopAutomatic(); angle = 0; syncAngle(); } else rotate(event.key === 'ArrowLeft' ? -15 : 15);
    }
  });
  on(stage, 'pointerenter', event => { if (event.pointerType === 'mouse') { hovering = true; schedule(); } });
  on(stage, 'pointerleave', event => { if (event.pointerType === 'mouse') { hovering = false; schedule(); } });
  on(stage, 'focus', () => { focused = true; schedule(); });
  on(stage, 'blur', () => { focused = false; schedule(); });
  on(stage, 'pointerdown', event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    stopAutomatic(); dragging = true; pointerId = event.pointerId; startX = event.clientX; startAngle = angle;
    stage.setPointerCapture(event.pointerId); stage.classList.add('is-dragging');
  });
  on(stage, 'pointermove', event => { if (dragging && event.pointerId === pointerId) { angle = startAngle + (event.clientX - startX) * .65; syncAngle(); } });
  function release(event) {
    if (event.pointerId !== pointerId) return;
    dragging = false; pointerId = null; stage.classList.remove('is-dragging');
    if (stage.hasPointerCapture(event.pointerId)) stage.releasePointerCapture(event.pointerId);
    schedule();
  }
  on(stage, 'pointerup', release); on(stage, 'pointercancel', release); on(stage, 'lostpointercapture', release);
  on(doc, 'visibilitychange', schedule);
  const motionChanged = () => { reduced = media.matches; if (reduced) stopAutomatic(); };
  if (media.addEventListener) on(media, 'change', motionChanged);
  const observer = win.IntersectionObserver ? new win.IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule(); }, { threshold: .05 }) : null;
  if (observer) observer.observe(stage);
  const resize = win.ResizeObserver ? new win.ResizeObserver(fit) : null;
  if (resize) resize.observe(stage); else on(win, 'resize', fit);
  render(false); schedule();
  return {
    getDesign: () => designBrief(state), setDesign,
    destroy() { dead = true; events.forEach(remove => remove()); observer?.disconnect(); resize?.disconnect(); if (frame) win.cancelAnimationFrame(frame); root.replaceChildren(); root.classList.remove('vs-bag-studio'); }
  };
}
