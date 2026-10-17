'use client';

import React, { useRef, useEffect } from 'react';
import { AUTOMATION_IMAGES } from './data';

interface AutomationHeroSectionProps {
  onOpenProduct: (productId: string) => void;
  onOpenImageModal: (src: string, alt: string) => void;
  onSelectCategoryFilter: (categoryGroup: string) => void;
}

export default function AutomationHeroSection({
  onOpenProduct,
  onOpenImageModal,
  onSelectCategoryFilter
}: AutomationHeroSectionProps): JSX.Element {
  const shellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const card = cardRef.current;
    if (!shell || !card) return;

    let heroFrame = 0;
    let heroLast = 0;
    let rect: DOMRect | null = null;
    const spring = { x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 };
    const omega = (2 * Math.PI) / 0.4;
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const canTilt = () =>
      fine.matches &&
      window.innerWidth > 760 &&
      !reduced.matches &&
      document.documentElement.dataset.motion !== 'paused' &&
      !document.hidden;

    function axis(value: number, velocity: number, target: number, dt: number): [number, number] {
      const delta = value - target;
      const c = velocity + omega * delta;
      const d = Math.exp(-omega * dt);
      return [target + (delta + c * dt) * d, (velocity - omega * c * dt) * d];
    }

    function heroTick(now: number) {
      heroFrame = 0;
      if (!canTilt()) {
        resetHero();
        return;
      }
      const dt = heroLast ? Math.min(0.04, (now - heroLast) / 1000) : 1 / 60;
      heroLast = now;
      [spring.x, spring.vx] = axis(spring.x, spring.vx, spring.tx, dt);
      [spring.y, spring.vy] = axis(spring.y, spring.vy, spring.ty, dt);

      if (card) {
        card.style.transform = `rotateX(${(-spring.y).toFixed(3)}deg) rotateY(${spring.x.toFixed(3)}deg)`;
      }

      if (
        Math.abs(spring.x - spring.tx) +
          Math.abs(spring.y - spring.ty) +
          Math.abs(spring.vx) +
          Math.abs(spring.vy) >
        0.025
      ) {
        heroFrame = requestAnimationFrame(heroTick);
      } else {
        heroLast = 0;
        if (!spring.tx && !spring.ty && card) {
          card.style.transform = '';
          card.style.willChange = '';
        }
      }
    }

    function wakeHero() {
      if (canTilt() && !heroFrame) {
        if (card) card.style.willChange = 'transform';
        heroFrame = requestAnimationFrame(heroTick);
      }
    }

    function resetHero() {
      if (heroFrame) cancelAnimationFrame(heroFrame);
      heroFrame = 0;
      heroLast = 0;
      spring.x = 0;
      spring.y = 0;
      spring.vx = 0;
      spring.vy = 0;
      spring.tx = 0;
      spring.ty = 0;
      if (card) {
        card.style.transform = '';
        card.style.willChange = '';
      }
      rect = null;
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!canTilt() || e.pointerType === 'touch') return;
      if (!rect) rect = shell.getBoundingClientRect();
      spring.tx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5)) * 5;
      spring.ty = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5)) * 4;
      wakeHero();
    };

    const onPointerLeave = () => {
      spring.tx = 0;
      spring.ty = 0;
      rect = null;
      wakeHero();
    };

    const onScroll = () => {
      rect = null;
    };

    shell.addEventListener('pointermove', onPointerMove);
    shell.addEventListener('pointerleave', onPointerLeave);
    shell.addEventListener('pointercancel', resetHero);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resetHero);

    return () => {
      resetHero();
      shell.removeEventListener('pointermove', onPointerMove);
      shell.removeEventListener('pointerleave', onPointerLeave);
      shell.removeEventListener('pointercancel', resetHero);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resetHero);
    };
  }, []);

  const heroEquipmentSrc = AUTOMATION_IMAGES['schneider-drives'] || '/assets/automation/schneider-drives.jpeg';
  const heroPlcSrc = AUTOMATION_IMAGES['schneider-plc'] || '/assets/automation/schneider-plc.jpeg';
  const heroHmiSrc = AUTOMATION_IMAGES['schneider-hmi'] || '/assets/automation/schneider-hmi.jpeg';

  return (
    <section className="hero" id="automation-hero" aria-labelledby="heroTitle">
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Electrical &amp; industrial automation</p>
            <h1 id="heroTitle">
              <span className="title-line">Powering</span>
              <span className="title-line">industrial</span>
              <span className="title-line">
                <em>excellence.</em>
              </span>
            </h1>
            <p className="hero-intro">
              The right products. A connected process.
              <br />
              Sourcing and engineering support for control, power distribution and machine automation.
            </p>
            <div className="hero-actions">
              <a className="btn btn-lime" href="#automation-catalog">
                Explore our portfolio
                <svg className="icon" aria-hidden="true">
                  <use href="#i-ne" />
                </svg>
              </a>
              <a className="btn btn-ghost" href="#how-they-work">
                <svg className="icon" aria-hidden="true">
                  <use href="#i-play" />
                </svg>
                See them work
              </a>
            </div>
            <p className="hero-proof">
              <svg className="icon" aria-hidden="true">
                <use href="#i-pin" />
              </svg>
              Peenya, Bengaluru <span aria-hidden="true">·</span> Built around your application
            </p>
          </div>

          <div className="hero-visual" id="heroVisual" ref={shellRef}>
            <figure className="equipment-frame" id="equipmentFrame" ref={cardRef}>
              <div className="equipment-window">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  id="heroEquipment"
                  src={heroEquipmentSrc}
                  alt="Altivar variable-frequency drives — authentic brochure photograph"
                  width={360}
                  height={280}
                  loading="eager"
                />
                <div className="hero-component-stack">
                  <button
                    type="button"
                    onClick={() => onOpenProduct('schneider-plc')}
                    aria-label="View Modicon PLC & I/O product details"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroPlcSrc} alt="" width={80} height={60} loading="eager" />
                    <span>Modicon PLC</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenProduct('schneider-hmi')}
                    aria-label="View Harmony HMI product details"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroHmiSrc} alt="" width={80} height={60} loading="eager" />
                    <span>Harmony HMI</span>
                  </button>
                </div>
                <button
                  className="view-image-btn"
                  id="viewHero"
                  type="button"
                  aria-label="Enlarge hero equipment photograph"
                  onClick={() =>
                    onOpenImageModal(
                      heroEquipmentSrc,
                      'Altivar variable-frequency drives — authentic brochure photograph'
                    )
                  }
                >
                  <svg className="icon" aria-hidden="true">
                    <use href="#i-expand" />
                  </svg>
                </button>
              </div>
              <figcaption className="equipment-foot">
                <div>
                  <strong>Altivar drives · Modicon PLC · Harmony HMI</strong>
                  <small>Original brochure photography · Schneider Electric</small>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="hero-bottom">
          <p>Browse our range:</p>
          <div className="hero-sectors">
            <a
              href="#automation-catalog"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategoryFilter('control');
                document.getElementById('automation-catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Control &amp; HMI
            </a>
            <a
              href="#automation-catalog"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategoryFilter('drives');
                document.getElementById('automation-catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Drives &amp; motion
            </a>
            <a
              href="#automation-catalog"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategoryFilter('protection');
                document.getElementById('automation-catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Switchgear
            </a>
            <a
              href="#automation-catalog"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategoryFilter('panels');
                document.getElementById('automation-catalog')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Engineered panels
            </a>
          </div>
          <a className="scroll-cue" href="#brands-section">
            Scroll to explore{' '}
            <svg className="icon" aria-hidden="true">
              <use href="#i-down" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
