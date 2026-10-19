'use client';

import { useEffect } from 'react';

export default function PremiumMotionController() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)');
    const paused = () => root.dataset.motion === 'paused' || reduced.matches;
    const canTrack = () => !paused() && finePointer.matches && !document.hidden;
    const q = (selector: string) => document.querySelector(selector);
    const qa = (selector: string) => Array.from(document.querySelectorAll(selector));
    const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

    const animations = new Set<Animation>();
    const observers: (IntersectionObserver | MutationObserver)[] = [];

    function animate(element: Element | null, keyframes: Keyframe[] | PropertyIndexedKeyframes, options: KeyframeAnimationOptions) {
      if (!element || paused() || typeof element.animate !== 'function') return null;
      const animation = element.animate(keyframes, options);
      animations.add(animation);
      animation.finished.then(() => animations.delete(animation)).catch(() => animations.delete(animation));
      return animation;
    }

    /* Spring physics loop for pointer-following effects */
    interface Follower {
      element: HTMLElement;
      x: number;
      y: number;
      vx: number;
      vy: number;
      tx: number;
      ty: number;
      rect: DOMRect | null;
      paint: (x: number, y: number) => void;
    }

    const followers: Follower[] = [];
    let springFrame = 0;
    let previousTime = 0;
    const omega = (2 * Math.PI) / 0.4;

    function axis(value: number, velocity: number, target: number, dt: number): [number, number] {
      const displacement = value - target;
      const c = velocity + omega * displacement;
      const decay = Math.exp(-omega * dt);
      return [target + (displacement + c * dt) * decay, (velocity - omega * c * dt) * decay];
    }

    function paintFollowers(now: number) {
      springFrame = 0;
      if (!canTrack()) {
        resetFollowers();
        return;
      }
      const dt = previousTime ? Math.min(0.04, (now - previousTime) / 1000) : 1 / 60;
      previousTime = now;
      let moving = false;
      for (const f of followers) {
        [f.x, f.vx] = axis(f.x, f.vx, f.tx, dt);
        [f.y, f.vy] = axis(f.y, f.vy, f.ty, dt);
        const settled = Math.abs(f.x - f.tx) + Math.abs(f.y - f.ty) + Math.abs(f.vx) + Math.abs(f.vy) < 0.025;
        if (settled) {
          f.x = f.tx;
          f.y = f.ty;
          f.vx = 0;
          f.vy = 0;
        } else {
          moving = true;
        }
        f.paint(f.x, f.y);
        if (settled && f.tx === 0 && f.ty === 0) {
          f.element.style.willChange = '';
        }
      }
      if (moving) {
        springFrame = requestAnimationFrame(paintFollowers);
      } else {
        previousTime = 0;
      }
    }

    function wakeSpring() {
      if (!canTrack()) return;
      if (!springFrame) springFrame = requestAnimationFrame(paintFollowers);
    }

    function resetFollowers() {
      if (springFrame) cancelAnimationFrame(springFrame);
      springFrame = 0;
      previousTime = 0;
      followers.forEach(f => {
        f.x = f.y = f.vx = f.vy = f.tx = f.ty = 0;
        f.paint(0, 0);
        f.element.style.willChange = '';
      });
      qa('.is-tracking,.fx-lit').forEach(el => el.classList.remove('is-tracking', 'fx-lit'));
    }

    function follow(
      area: HTMLElement,
      element: HTMLElement,
      amountX: number,
      amountY: number,
      paint: (x: number, y: number) => void
    ) {
      const f: Follower = { element, x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0, rect: null, paint };
      followers.push(f);

      const onEnter = (e: PointerEvent) => {
        if (!canTrack() || e.pointerType === 'touch') return;
        f.rect = area.getBoundingClientRect();
        element.style.willChange = 'transform';
        area.classList.add('is-tracking');
      };

      const onMove = (e: PointerEvent) => {
        if (!canTrack() || e.pointerType === 'touch') return;
        if (!f.rect) f.rect = area.getBoundingClientRect();
        f.tx = clamp((e.clientX - f.rect.left) / f.rect.width - 0.5, -0.5, 0.5) * amountX * 2;
        f.ty = clamp((e.clientY - f.rect.top) / f.rect.height - 0.5, -0.5, 0.5) * amountY * 2;
        wakeSpring();
      };

      const leave = () => {
        f.tx = 0;
        f.ty = 0;
        f.rect = null;
        area.classList.remove('is-tracking');
        wakeSpring();
      };

      area.addEventListener('pointerenter', onEnter as EventListener);
      area.addEventListener('pointermove', onMove as EventListener);
      area.addEventListener('pointerleave', leave);
      area.addEventListener('pointercancel', leave);
      area.addEventListener('focusout', leave);
    }

    const depthShell = q('.hero-depth-shell') as HTMLElement | null;
    const heroArt = q('.hero-depth-shell .hero-art') as HTMLElement | null;
    if (depthShell && heroArt) {
      follow(depthShell, heroArt, 3.6, 2.5, (x, y) => {
        heroArt.style.transform = x || y ? `rotateX(${(-y).toFixed(3)}deg) rotateY(${x.toFixed(3)}deg)` : '';
      });
    }

    qa('.hero-actions .btn').forEach(btn => {
      const button = btn as HTMLElement;
      const content = button.querySelector('.magnetic-content') as HTMLElement | null;
      if (content) {
        follow(button, content, 3.5, 2.5, (x, y) => {
          content.style.transform = x || y ? `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)` : '';
        });
      }
    });

    /* Card spotlight effect */
    interface SpotState {
      card: HTMLElement;
      light: HTMLElement;
      x: number;
      y: number;
      rect: DOMRect | null;
      size: number;
      dirty: boolean;
    }

    const spotStates: SpotState[] = [];
    let lightFrame = 0;

    function paintLights() {
      lightFrame = 0;
      if (!canTrack()) return;
      spotStates.forEach(s => {
        if (!s.dirty) return;
        s.light.style.transform = `translate3d(${(s.x - s.size / 2).toFixed(1)}px,${(s.y - s.size / 2).toFixed(1)}px,0)`;
        s.dirty = false;
      });
    }

    qa('.industry-card,.range-panel,.process-visual,.contact').forEach(cardEl => {
      const card = cardEl as HTMLElement;
      let light = card.querySelector('.card-spotlight') as HTMLElement | null;
      if (!light) {
        light = document.createElement('span');
        light.className = 'card-spotlight';
        light.setAttribute('aria-hidden', 'true');
        card.appendChild(light);
      }

      const s: SpotState = { card, light, x: 0, y: 0, rect: null, size: 320, dirty: false };
      spotStates.push(s);

      card.addEventListener('pointerenter', ((e: PointerEvent) => {
        if (!canTrack() || e.pointerType === 'touch') return;
        s.rect = card.getBoundingClientRect();
        s.size = light?.getBoundingClientRect().width || 320;
        card.classList.add('fx-lit');
      }) as EventListener);

      card.addEventListener('pointermove', ((e: PointerEvent) => {
        if (!canTrack() || e.pointerType === 'touch') return;
        if (card.classList.contains('range-panel') || !s.rect) s.rect = card.getBoundingClientRect();
        s.x = e.clientX - s.rect.left;
        s.y = e.clientY - s.rect.top;
        s.dirty = true;
        if (!lightFrame) lightFrame = requestAnimationFrame(paintLights);
      }) as EventListener);

      card.addEventListener('pointerleave', () => {
        card.classList.remove('fx-lit');
        s.rect = null;
      });
      card.addEventListener('pointercancel', () => {
        card.classList.remove('fx-lit');
        s.rect = null;
      });
    });

    /* Hero headline entrance animation */
    qa('.hero h1 .title-line').forEach((line, i) => {
      animate(
        line,
        [{ transform: 'translateY(106%)', opacity: 0 }, { transform: 'translateY(0)', opacity: 1 }],
        { duration: 820, delay: 70 + i * 95, easing: 'cubic-bezier(.22,.8,.24,1)', fill: 'backwards' }
      );
    });

    const intro = q('.hero-copy>.eyebrow');
    if (intro) {
      animate(intro, [{ opacity: 0, transform: 'translateY(7px)' }, { opacity: 1, transform: 'none' }], {
        duration: 600,
        easing: 'cubic-bezier(.23,1,.32,1)'
      });
    }

    /* Scroll reveal and heading clipPath entrance */
    const headingSeen = new WeakSet();
    if ('IntersectionObserver' in window) {
      const headingObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting || headingSeen.has(entry.target)) return;
            headingSeen.add(entry.target);
            headingObserver.unobserve(entry.target);
            animate(
              entry.target,
              [
                { clipPath: 'inset(0 0 95% 0)', transform: 'translateY(12px)', opacity: 0.25 },
                { clipPath: 'inset(0)', transform: 'none', opacity: 1 }
              ],
              { duration: 650, easing: 'cubic-bezier(.23,1,.32,1)' }
            );
          });
        },
        { threshold: 0.4 }
      );
      qa('.section-title,#studioTitle').forEach(h => headingObserver.observe(h));
      observers.push(headingObserver);

      const visibilityObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => entry.target.classList.toggle('fx-offscreen', !entry.isIntersecting));
        },
        { rootMargin: '80px' }
      );
      qa('.hero,.process').forEach(el => visibilityObserver.observe(el));
      observers.push(visibilityObserver);

      const revealObserver = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible', 'seen');
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: '100px 0px 100px 0px' }
      );
      qa('.reveal').forEach(el => revealObserver.observe(el));
      observers.push(revealObserver);

      // Senior Engineering Fail-Safe: Ensure all sections are guaranteed visible after initial paint
      const revealTimer = setTimeout(() => {
        qa('.reveal').forEach(el => el.classList.add('visible', 'seen'));
      }, 350);
    }

    /* Texture magnifier lens */
    const photo = q('.material-photo') as HTMLElement | null;
    const photoImage = photo ? (photo.querySelector('img') as HTMLImageElement | null) : null;
    let lensFrame = 0;
    interface LensState {
      rect: DOMRect;
      x: number;
      y: number;
    }
    let lensState: LensState | null = null;

    if (photo && photoImage) {
      let lens = photo.querySelector('.texture-lens') as HTMLElement | null;
      if (!lens) {
        lens = document.createElement('div');
        lens.className = 'texture-lens';
        lens.setAttribute('aria-hidden', 'true');
        photo.appendChild(lens);
      }
      lens.style.backgroundImage = `url("${photoImage.src}")`;

      const stopLens = () => {
        photo.classList.remove('is-inspecting');
        if (lensFrame) cancelAnimationFrame(lensFrame);
        lensFrame = 0;
        lensState = null;
      };

      const paintLens = () => {
        lensFrame = 0;
        if (!lensState || !lens) return;
        const { x, y, rect } = lensState;
        const zoom = 2.15;
        const radius = 63;
        const width = photoImage.naturalWidth || 1536;
        const height = photoImage.naturalHeight || 1024;
        const scale = Math.max(rect.width / width, rect.height / height);
        const coverWidth = width * scale;
        const coverHeight = height * scale;
        const cropX = (coverWidth - rect.width) * 0.5;
        const cropY = (coverHeight - rect.height) * 0.45;
        const cx = clamp(x, radius, rect.width - radius);
        const cy = clamp(y, radius, rect.height - radius);

        lens.style.transform = `translate3d(${(cx - radius).toFixed(1)}px,${(cy - radius).toFixed(1)}px,0)`;
        lens.style.backgroundSize = `${(coverWidth * zoom).toFixed(1)}px ${(coverHeight * zoom).toFixed(1)}px`;
        lens.style.backgroundPosition = `${(radius - (x + cropX) * zoom).toFixed(1)}px ${(radius - (y + cropY) * zoom).toFixed(1)}px`;
      };

      const onPointerMove = (e: PointerEvent) => {
        if (!finePointer.matches || e.pointerType === 'touch' || (e.target as HTMLElement)?.closest('button')) {
          stopLens();
          return;
        }
        const rect = lensState ? lensState.rect : photo.getBoundingClientRect();
        lensState = { rect, x: clamp(e.clientX - rect.left, 0, rect.width), y: clamp(e.clientY - rect.top, 0, rect.height) };
        photo.classList.add('is-inspecting');
        if (!lensFrame) lensFrame = requestAnimationFrame(paintLens);
      };

      photo.addEventListener('pointermove', onPointerMove as EventListener);
      photo.addEventListener('pointerleave', stopLens);
      photo.addEventListener('pointercancel', stopLens);
      window.addEventListener('resize', stopLens);
      window.addEventListener('scroll', stopLens, { passive: true });
    }

    /* Native Photo Viewer Dialog */
    const dialog = q('#photoViewer') as HTMLDialogElement | null;
    const viewerImage = q('#viewerImage') as HTMLImageElement | null;
    const viewerTitle = q('#viewerTitle') as HTMLElement | null;
    let photoOpener: HTMLElement | null = null;
    let previousBodyPadding = '';

    const closeViewer = () => {
      if (dialog && dialog.open) dialog.close();
    };

    qa('[data-inspect-photo]').forEach(btn => {
      const button = btn as HTMLElement;
      button.addEventListener('click', () => {
        if (!dialog || typeof dialog.showModal !== 'function') return;
        const source = document.getElementById(button.dataset.inspectPhoto || '') as HTMLImageElement | null;
        if (!source || !viewerImage) return;
        photoOpener = button;
        viewerImage.src = source.src;
        viewerImage.alt = source.alt;
        if (viewerTitle) {
          viewerTitle.textContent = button.dataset.viewerTitle || 'A closer look.';
        }
        previousBodyPadding = document.body.style.paddingRight;
        const gap = window.innerWidth - document.documentElement.clientWidth;
        if (gap > 0) document.body.style.paddingRight = `${gap}px`;
        dialog.showModal();
        document.body.classList.add('photo-viewer-open');
      });
    });

    if (dialog) {
      q('#closePhotoViewer')?.addEventListener('click', closeViewer);
      q('#viewerDone')?.addEventListener('click', closeViewer);
      dialog.addEventListener('click', (e: MouseEvent) => {
        if (e.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) {
          closeViewer();
        }
      });
      dialog.addEventListener('close', () => {
        document.body.classList.remove('photo-viewer-open');
        document.body.style.paddingRight = previousBodyPadding;
        if (photoOpener) photoOpener.focus({ preventScroll: true });
      });
    }

    /* Sync motion state */
    const syncMotion = () => {
      if (paused() || !finePointer.matches || document.hidden) {
        animations.forEach(a => a.cancel());
        animations.clear();
        resetFollowers();
        if (lightFrame) cancelAnimationFrame(lightFrame);
        lightFrame = 0;
      }
    };

    const motionObserver = new MutationObserver(syncMotion);
    motionObserver.observe(root, { attributes: true, attributeFilter: ['data-motion'] });
    observers.push(motionObserver);

    reduced.addEventListener('change', syncMotion);
    finePointer.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);

    return () => {
      animations.forEach(a => a.cancel());
      animations.clear();
      resetFollowers();
      if (lightFrame) cancelAnimationFrame(lightFrame);
      if (lensFrame) cancelAnimationFrame(lensFrame);
      observers.forEach(obs => obs.disconnect());
      reduced.removeEventListener('change', syncMotion);
      finePointer.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncMotion);
    };
  }, []);

  return null;
}
