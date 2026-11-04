'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { AUTOMATION_IMAGES } from './data';
import { AUTOMATION_PORTFOLIO_CARDS, AutomationPortfolioCard } from '@/content/industrial';

interface AutomationRangeRailProps {
  onSelectFamily?: (categoryGroup: string) => void;
}

export function AutomationRangeRail({ onSelectFamily }: AutomationRangeRailProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);

  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Track pointer movement distance to distinguish clean clicks from drags
  const dragDistanceRef = useRef<number>(0);
  const dragStartPosRef = useRef<{ x: number; y: number } | null>(null);

  // References to keep animation state stable across renders
  const animRef = useRef<{
    rail: Animation | null;
    railDuration: number;
    railDistance: number;
    hovered: boolean;
    focused: boolean;
    visible: boolean;
    drag: {
      id: number;
      startX: number;
      startTime: number;
      history: { x: number; t: number }[];
      moved: boolean;
    } | null;
    coastFrame: number;
    coastVelocity: number;
    coastTime: number;
  }>({
    rail: null,
    railDuration: 1,
    railDistance: 1,
    hovered: false,
    focused: false,
    visible: true,
    drag: null,
    coastFrame: 0,
    coastVelocity: 29,
    coastTime: 0,
  });

  const normalized = (t: number, dur: number) => ((t % dur) + dur) % dur;

  const mayPlay = useCallback(() => {
    const a = animRef.current;
    return (
      !isPaused &&
      !isReducedMotion &&
      !a.hovered &&
      !a.focused &&
      !a.drag &&
      a.visible &&
      typeof document !== 'undefined' &&
      !document.hidden
    );
  }, [isPaused, isReducedMotion]);

  const cancelCoast = useCallback(() => {
    if (animRef.current.coastFrame) {
      cancelAnimationFrame(animRef.current.coastFrame);
      animRef.current.coastFrame = 0;
      animRef.current.coastTime = 0;
    }
  }, []);

  const syncRail = useCallback(() => {
    const a = animRef.current;
    if (!a.rail) return;
    if (mayPlay() && !a.coastFrame) {
      a.rail.play();
    } else {
      a.rail.pause();
    }
    if (!mayPlay()) cancelCoast();
  }, [mayPlay, cancelCoast]);

  const coast = useCallback(
    (now: number) => {
      const a = animRef.current;
      a.coastFrame = 0;
      if (!mayPlay() || !a.rail) {
        a.coastTime = 0;
        syncRail();
        return;
      }
      const dt = a.coastTime ? Math.min(0.04, (now - a.coastTime) / 1000) : 1 / 60;
      a.coastTime = now;
      a.coastVelocity = 29 + (a.coastVelocity - 29) * Math.pow(0.99, dt * 1000);
      a.rail.pause();
      const currentT = Number(a.rail.currentTime) || 0;
      a.rail.currentTime = normalized(
        currentT + (a.coastVelocity / 29) * dt * 1000,
        a.railDuration
      );
      if (Math.abs(a.coastVelocity - 29) > 3) {
        a.coastFrame = requestAnimationFrame(coast);
      } else {
        a.coastTime = 0;
        syncRail();
      }
    },
    [mayPlay, syncRail]
  );

  const setupRail = useCallback(() => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    const setEl = setRef.current;
    const cloneEl = cloneRef.current;
    if (!track || !viewport || !setEl || !cloneEl) return;

    const a = animRef.current;
    const phase =
      a.rail && a.railDuration
        ? normalized(Number(a.rail.currentTime) || 0, a.railDuration) / a.railDuration
        : 0;

    cancelCoast();
    if (a.rail) {
      a.rail.cancel();
      a.rail = null;
    }

    const staticMode = isReducedMotion || typeof track.animate !== 'function';
    cloneEl.hidden = staticMode;
    viewport.dataset.static = String(staticMode);
    viewport.style.overflowX = staticMode ? 'auto' : '';

    if (staticMode) return;

    a.railDistance = setEl.getBoundingClientRect().width + 12;
    a.railDuration = (a.railDistance / 29) * 1000;
    a.rail = track.animate(
      [
        { transform: `translateX(${-a.railDistance}px)` },
        { transform: 'translateX(0px)' },
      ],
      {
        duration: a.railDuration,
        iterations: Infinity,
        easing: 'linear',
      }
    );
    a.rail.currentTime = phase * a.railDuration;
    syncRail();
  }, [isReducedMotion, cancelCoast, syncRail]);

  // Reduced motion media query listener
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Setup intersection observer & rail lifecycle
  useEffect(() => {
    setupRail();

    const viewport = viewportRef.current;
    if (!viewport) return;

    let railObserver: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      railObserver = new IntersectionObserver(
        (entries) => {
          animRef.current.visible = entries[0].isIntersecting;
          syncRail();
        },
        { rootMargin: '80px' }
      );
      railObserver.observe(viewport);
    }

    let resizeFrame = 0;
    const onResize = () => {
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resizeFrame = 0;
        setupRail();
      });
    };
    window.addEventListener('resize', onResize);

    const onVisibilityChange = () => syncRail();
    document.addEventListener('visibilitychange', onVisibilityChange);

    const animInstance = animRef.current;

    return () => {
      cancelCoast();
      if (resizeFrame) cancelAnimationFrame(resizeFrame);
      if (animInstance.rail) {
        animInstance.rail.cancel();
        animInstance.rail = null;
      }
      railObserver?.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [setupRail, syncRail, cancelCoast]);

  useEffect(() => {
    syncRail();
  }, [isPaused, syncRail]);

  // Pointer & Drag Handlers
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
      animRef.current.hovered = true;
      syncRail();
    }
  };

  const handlePointerLeave = () => {
    animRef.current.hovered = false;
    syncRail();
  };

  const handleFocusIn = () => {
    animRef.current.focused = true;
    syncRail();
  };

  const handleFocusOut = () => {
    animRef.current.focused = false;
    syncRail();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = animRef.current;
    if (!a.rail || a.drag || e.button !== 0 || isReducedMotion) return;
    cancelCoast();
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    dragDistanceRef.current = 0;
    a.drag = {
      id: e.pointerId,
      startX: e.clientX,
      startTime: Number(a.rail.currentTime) || 0,
      history: [{ x: e.clientX, t: performance.now() }],
      moved: false,
    };
    a.rail.pause();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const a = animRef.current;
    if (!a.drag || e.pointerId !== a.drag.id || !a.rail) return;
    const dx = e.clientX - a.drag.startX;
    if (dragStartPosRef.current) {
      const dist = Math.hypot(
        e.clientX - dragStartPosRef.current.x,
        e.clientY - dragStartPosRef.current.y
      );
      if (dist > dragDistanceRef.current) {
        dragDistanceRef.current = dist;
      }
    }
    if (Math.abs(dx) > 6) {
      if (!a.drag.moved) {
        a.drag.moved = true;
        viewportRef.current?.setPointerCapture(e.pointerId);
      }
    }
    if (!a.drag.moved) return;

    viewportRef.current?.classList.add('dragging');
    a.rail.currentTime = normalized(
      a.drag.startTime + (dx / 29) * 1000,
      a.railDuration
    );
    const now = performance.now();
    a.drag.history.push({ x: e.clientX, t: now });
    while (a.drag.history.length > 2 && now - a.drag.history[0].t > 110) {
      a.drag.history.shift();
    }
  };

  const release = (e: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    const a = animRef.current;
    if (!a.drag || e.pointerId !== a.drag.id) return;
    const history = a.drag.history;
    const moved = a.drag.moved;
    let velocity = 0;
    if (history.length > 1) {
      const p1 = history[0];
      const p2 = history[history.length - 1];
      if (performance.now() - p2.t < 100) {
        velocity = ((p2.x - p1.x) / Math.max(1, p2.t - p1.t)) * 1000;
      }
    }
    a.drag = null;
    viewportRef.current?.classList.remove('dragging');
    if (viewportRef.current?.hasPointerCapture(e.pointerId)) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }
    // Allow pending click event to read dragDistance before clearing
    setTimeout(() => {
      dragDistanceRef.current = 0;
      dragStartPosRef.current = null;
    }, 60);

    if (moved && !cancelled && mayPlay() && Math.abs(velocity) > 70) {
      a.coastVelocity = Math.max(-900, Math.min(900, velocity));
      a.coastTime = 0;
      a.coastFrame = requestAnimationFrame(coast);
    } else {
      syncRail();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const dir = e.key === 'ArrowRight' ? 1 : -1;
    const viewport = viewportRef.current;
    if (isReducedMotion && viewport) {
      viewport.scrollBy({ left: dir * 190, behavior: 'instant' });
      return;
    }
    const a = animRef.current;
    if (a.rail) {
      cancelCoast();
      a.rail.currentTime = normalized(
        (Number(a.rail.currentTime) || 0) + (dir * 190 / 29) * 1000,
        a.railDuration
      );
      syncRail();
    }
  };

  const handleCardClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    card: AutomationPortfolioCard
  ) => {
    // If pointer moved more than 6px, treat as drag and prevent navigation
    if (dragDistanceRef.current > 6) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Clean click / tap: select the catalog category
    if (card.targetCategoryGroup) {
      onSelectFamily?.(card.targetCategoryGroup);
    }
  };

  const renderCards = (isClone = false) => (
    <div
      className="rail-set"
      ref={isClone ? cloneRef : setRef}
      aria-hidden={isClone ? 'true' : undefined}
    >
      {AUTOMATION_PORTFOLIO_CARDS.map((f) => {
        const hasValidDestination = Boolean(f.href && f.href !== '#');
        return (
          <Link
            key={f.id}
            href={f.href}
            className="range-card"
            tabIndex={isClone ? -1 : 0}
            aria-hidden={isClone ? 'true' : undefined}
            aria-label={isClone ? undefined : f.ariaLabel}
            draggable={false}
            onClick={(e) => handleCardClick(e, f)}
            onFocus={isClone ? undefined : handleFocusIn}
            onBlur={isClone ? undefined : handleFocusOut}
          >
            <span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={AUTOMATION_IMAGES[f.imageKey] || f.imageKey}
                alt=""
                width={67}
                height={56}
                draggable={false}
              />
            </span>
            <div className="range-label">
              <b>{f.title}</b>
              <small>{f.subtitle}</small>
            </div>
            {/* {hasValidDestination && (
              <svg className="icon" aria-hidden="true">
                <use href="#i-ne" />
              </svg>
            )} */}
          </Link>
        );
      })}
    </div>
  );

  return (
    <section className="ranges" id="ranges" aria-label="Product families">
      <div className="wrap range-top">
        <span>A connected industrial portfolio</span>
        <div className="rail-tools">
          <span>Drag to explore</span>
          <button
            id="railPause"
            type="button"
            aria-label={isPaused ? 'Resume product strip' : 'Pause product strip'}
            aria-pressed={isPaused}
            disabled={isReducedMotion}
            onClick={() => setIsPaused((prev) => !prev)}
          >
            <svg className="icon" aria-hidden="true">
              <use href={isPaused ? '#i-play' : '#i-pause'} />
            </svg>
          </button>
        </div>
      </div>
      <div
        className="range-viewport"
        id="rangeViewport"
        ref={viewportRef}
        tabIndex={0}
        role="region"
        aria-label="Moving product families. Use left and right arrows to explore."
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onFocus={handleFocusIn}
        onBlur={handleFocusOut}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(e) => release(e)}
        onPointerCancel={(e) => release(e, true)}
        onKeyDown={handleKeyDown}
      >
        <div className="range-track" id="rangeTrack" ref={trackRef}>
          {renderCards(false)}
          {renderCards(true)}
        </div>
      </div>
    </section>
  );
}
