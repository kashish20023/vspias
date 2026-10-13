'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ProductItem } from '@/lib/catalog-service';

interface ProductRangeRailProps {
  division: 'automation' | 'paper';
  title: string;
  subtitle: string;
  footnote: string;
  products: ProductItem[];
  onSelectProduct: (product: ProductItem) => void;
  onOpenFullRange: () => void;
}

export default function ProductRangeRail({
  division,
  title,
  subtitle,
  footnote,
  products,
  onSelectProduct,
  onOpenFullRange
}: ProductRangeRailProps): JSX.Element | null {
  const isRight = division === 'automation'; // Automation moves LEFT TO RIGHT; Paper moves RIGHT TO LEFT
  const speed = isRight ? 29 : 25; // px/sec
  const sign = isRight ? 1 : -1;

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Animation | null>(null);

  const [userPaused, setUserPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const userPausedRef = useRef(false);
  userPausedRef.current = userPaused;

  const isReducedMotionRef = useRef(false);
  isReducedMotionRef.current = isReducedMotion;

  const isHoveredRef = useRef(false);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const suppressClickRef = useRef(false);
  const spanRef = useRef(0);
  const durationRef = useRef(0);

  const canPlay = useCallback(() => {
    return (
      !userPausedRef.current &&
      !isHoveredRef.current &&
      !isDraggingRef.current &&
      isVisibleRef.current &&
      typeof document !== 'undefined' &&
      !document.hidden &&
      !isReducedMotionRef.current
    );
  }, []);

  const syncAnimationState = useCallback(() => {
    const anim = animationRef.current;
    if (!anim) return;
    if (canPlay()) {
      anim.play();
    } else {
      anim.pause();
    }
  }, [canPlay]);

  const updateRailAnimation = useCallback(() => {
    if (!groupRef.current || !trackRef.current) return;
    const w = groupRef.current.getBoundingClientRect().width;
    if (!w) return;

    const prevAnim = animationRef.current;
    const prevDuration = durationRef.current;
    const progress =
      prevAnim && prevDuration ? ((Number(prevAnim.currentTime) || 0) % prevDuration) / prevDuration : 0;

    prevAnim?.cancel();
    spanRef.current = w;
    durationRef.current = (w / speed) * 1000;

    if (isReducedMotionRef.current) {
      trackRef.current.style.transform = 'none';
      animationRef.current = null;
      return;
    }

    // Industrial Automation & Electricals product images move LEFT TO RIGHT: -span -> 0
    // Paper Bag Manufacturing product images move RIGHT TO LEFT: 0 -> -span
    const keyframes = isRight
      ? [{ transform: `translate3d(-${w}px, 0, 0)` }, { transform: 'translate3d(0px, 0, 0)' }]
      : [{ transform: 'translate3d(0px, 0, 0)' }, { transform: `translate3d(-${w}px, 0, 0)` }];

    const animation = trackRef.current.animate(keyframes, {
      duration: durationRef.current,
      iterations: Infinity,
      easing: 'linear'
    });

    animation.currentTime = progress * durationRef.current;
    animationRef.current = animation;
    syncAnimationState();
  }, [isRight, speed, syncAnimationState]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => {
      setIsReducedMotion(mq.matches);
      setTimeout(updateRailAnimation, 0);
    };
    updateMotion();
    mq.addEventListener('change', updateMotion);
    return () => mq.removeEventListener('change', updateMotion);
  }, [updateRailAnimation]);

  useEffect(() => {
    updateRailAnimation();

    const handleResize = () => {
      updateRailAnimation();
    };
    window.addEventListener('resize', handleResize);

    const handleVisibility = () => {
      syncAnimationState();
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let io: IntersectionObserver | null = null;
    if (viewportRef.current) {
      io = new IntersectionObserver(([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        syncAnimationState();
        if (entry.isIntersecting) {
          updateRailAnimation();
        }
      });
      io.observe(viewportRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      io?.disconnect();
      animationRef.current?.cancel();
    };
  }, [updateRailAnimation, syncAnimationState]);

  // Pointer drag & touch scrubbing
  const dragInfoRef = useRef<{
    id: number;
    startX: number;
    startY: number;
    startTime: number;
    lastX: number;
    lastT: number;
    velocity: number;
    active: boolean;
  } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isReducedMotionRef.current || e.button !== 0 || !animationRef.current) return;
    const anim = animationRef.current;
    anim.playbackRate = 1;
    dragInfoRef.current = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      startTime: Number(anim.currentTime) || 0,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
      active: false
    };
    syncAnimationState();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragInfoRef.current;
    if (!drag || drag.id !== e.pointerId || !animationRef.current) return;
    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.active) {
      if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) {
        // Vertical scroll intent — cancel horizontal drag
        dragInfoRef.current = null;
        isDraggingRef.current = false;
        syncAnimationState();
        return;
      }
      if (Math.abs(dx) < 8) return;
      drag.active = true;
      isDraggingRef.current = true;
      viewportRef.current?.setPointerCapture(e.pointerId);
    }

    const now = performance.now();
    const dt = now - drag.lastT;
    if (dt > 0) {
      drag.velocity = 0.65 * drag.velocity + (0.35 * (e.clientX - drag.lastX)) / (dt / 1000);
    }
    drag.lastX = e.clientX;
    drag.lastT = now;

    const duration = durationRef.current;
    if (duration > 0) {
      const shiftTime = (dx / (sign * speed)) * 1000;
      animationRef.current.currentTime = (((drag.startTime + shiftTime) % duration) + duration) % duration;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragInfoRef.current;
    if (!drag || drag.id !== e.pointerId) return;
    const wasActive = drag.active;
    dragInfoRef.current = null;
    isDraggingRef.current = false;

    if (viewportRef.current?.hasPointerCapture(e.pointerId)) {
      viewportRef.current.releasePointerCapture(e.pointerId);
    }

    if (wasActive) {
      suppressClickRef.current = true;
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 50);
    }

    syncAnimationState();
  };

  if (!products.length) return null;

  return (
    <div className="range-block" data-division={division}>
      <div className="range-heading wrap">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="range-actions">
          <button
            type="button"
            onClick={() => {
              const next = !userPaused;
              setUserPaused(next);
              userPausedRef.current = next;
              syncAnimationState();
            }}
            aria-pressed={userPaused}
            disabled={isReducedMotion}
          >
            {isReducedMotion ? 'Motion reduced' : userPaused ? 'Play motion' : 'Pause motion'}
          </button>
          <button type="button" onClick={onOpenFullRange}>
            View Full Range &rarr;
          </button>
        </div>
      </div>

      <div
        className="range-viewport"
        ref={viewportRef}
        aria-label="Moving product imagery. Use View Full Range for accessible product details."
        onPointerEnter={(e) => {
          if (e.pointerType === 'mouse') {
            isHoveredRef.current = true;
            syncAnimationState();
          }
        }}
        onPointerLeave={() => {
          isHoveredRef.current = false;
          syncAnimationState();
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="range-track" ref={trackRef} aria-hidden="true">
          <div className="range-group" ref={groupRef}>
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                className="range-card"
                tabIndex={-1}
                data-division={division}
                onClick={(e) => {
                  if (suppressClickRef.current) {
                    e.preventDefault();
                    return;
                  }
                  onSelectProduct(p);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={'/' + p.image.replace(/^\//, '')}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span>{p.brand}</span>
                <strong>{p.name}</strong>
              </button>
            ))}
          </div>

          {/* Cloned group for seamless wrap */}
          <div className="range-group" aria-hidden="true">
            {products.map((p) => (
              <button
                key={`clone-${p.id}`}
                type="button"
                className="range-card"
                tabIndex={-1}
                data-division={division}
                onClick={(e) => {
                  if (suppressClickRef.current) {
                    e.preventDefault();
                    return;
                  }
                  onSelectProduct(p);
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={'/' + p.image.replace(/^\//, '')}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
                <span>{p.brand}</span>
                <strong>{p.name}</strong>
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="range-footnote wrap">{footnote}</p>
    </div>
  );
}
