'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AUTOMATION_MODELS, AUTOMATION_IMAGES, AutomationModel } from './data';

interface AutomationWorkingDemosSectionProps {
  onOpenEnquiry: (context: string) => void;
  onOpenNotes: () => void;
}

export function AutomationWorkingDemosSection({
  onOpenEnquiry,
  onOpenNotes,
}: AutomationWorkingDemosSectionProps) {
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Model States
  const [m0, setM0] = useState({ closed: false, tripped: false });
  const [m1, setM1] = useState({ on: false });
  const [m2, setM2] = useState({ frequency: 30 });
  const [m3, setM3] = useState({
    level: 55,
    outlet: true,
    auto: true,
    pump: false,
  });
  const [m4, setM4] = useState({ load: 90, heat: 0, tripped: false });
  const [m5, setM5] = useState({ on: false });

  const [statusText, setStatusText] = useState('');

  // Animation references for VFD fan and simulation loop
  const fanRef = useRef<SVGGElement>(null);
  const fanAnimationRef = useRef<Animation | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef<boolean>(true);
  const lastTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);

  // Reduced motion media query check
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Intersection observer for pausing simulation when off-screen
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.08 }
    );
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  // VFD Fan Animation Setup
  useEffect(() => {
    if (selected !== 2) {
      if (fanAnimationRef.current) {
        fanAnimationRef.current.cancel();
        fanAnimationRef.current = null;
      }
      return;
    }

    const fan = fanRef.current;
    if (fan && typeof fan.animate === 'function') {
      const anim = fan.animate(
        [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
        { duration: 1600, iterations: Infinity }
      );
      fanAnimationRef.current = anim;
      const speedNorm = m2.frequency / 50;
      if (anim.updatePlaybackRate) {
        anim.updatePlaybackRate(Math.max(speedNorm, 0.001));
      } else {
        anim.playbackRate = Math.max(speedNorm, 0.001);
      }
      if (isPaused || isReducedMotion || m2.frequency === 0) {
        anim.pause();
      } else {
        anim.play();
      }
    }

    return () => {
      if (fanAnimationRef.current) {
        fanAnimationRef.current.cancel();
        fanAnimationRef.current = null;
      }
    };
  }, [selected, isPaused, isReducedMotion]);

  // Update playback rate when m2 frequency changes
  useEffect(() => {
    if (selected === 2 && fanAnimationRef.current) {
      const anim = fanAnimationRef.current;
      const speedNorm = m2.frequency / 50;
      if (anim.updatePlaybackRate) {
        anim.updatePlaybackRate(Math.max(speedNorm, 0.001));
      } else {
        anim.playbackRate = Math.max(speedNorm, 0.001);
      }
      if (isPaused || isReducedMotion || m2.frequency === 0) {
        anim.pause();
      } else {
        anim.play();
      }
    }
  }, [m2.frequency, selected, isPaused, isReducedMotion]);

  // Simulation tick loop for Tank (model 3) and Overload (model 4)
  const stepSimulation = useCallback(
    (dt: number) => {
      if (selected === 3) {
        setM3((prev) => {
          let pump = prev.pump;
          if (!prev.auto) {
            pump = false;
          } else if (prev.level <= 20) {
            pump = true;
          } else if (prev.level >= 85) {
            pump = false;
          }

          const fillRate = pump ? 11 : 0;
          const drainRate = prev.outlet ? 5 : 0;
          let newLevel = prev.level + (fillRate - drainRate) * dt;
          newLevel = Math.max(0, Math.min(100, newLevel));

          if (prev.auto) {
            if (newLevel >= 85) pump = false;
            else if (newLevel <= 20) pump = true;
          }

          return { ...prev, level: newLevel, pump };
        });
      } else if (selected === 4) {
        setM4((prev) => {
          let heat = prev.heat;
          let tripped = prev.tripped;

          if (tripped) {
            heat = Math.max(0, heat - 9 * dt);
          } else {
            if (prev.load > 100) {
              heat += ((prev.load - 100) / 50) * 14 * dt;
            } else {
              heat = Math.max(0, heat - 11 * dt);
            }
            if (heat >= 100) {
              heat = 100;
              tripped = true;
            }
          }
          return { ...prev, heat, tripped };
        });
      }
    },
    [selected]
  );

  useEffect(() => {
    if (selected !== 3 && selected !== 4) return;
    if (isPaused || isReducedMotion) return;

    let frameId = 0;
    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      if (!isVisibleRef.current || document.hidden) {
        lastTimeRef.current = now;
        frameId = requestAnimationFrame(loop);
        return;
      }
      const dt = lastTimeRef.current ? Math.min(0.08, (now - lastTimeRef.current) / 1000) : 0;
      lastTimeRef.current = now;
      stepSimulation(dt);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [selected, isPaused, isReducedMotion, stepSimulation]);

  // Compute status message
  useEffect(() => {
    if (selected === 0) {
      if (m0.tripped) {
        setStatusText('Fault simulated. The breaker opened the circuit.');
      } else if (m0.closed) {
        setStatusText('Contacts closed. The example load is energised.');
      } else {
        setStatusText('Breaker open. Close it to energise the example load.');
      }
    } else if (selected === 1) {
      setStatusText(
        m1.on
          ? 'Coil energised. Main contacts closed. Motor running.'
          : 'Coil de-energised. Contacts open. Motor stopped.'
      );
    } else if (selected === 2) {
      setStatusText(
        m2.frequency > 0
          ? 'Frequency adjusted. Compare the illustrative speed and fan-power values.'
          : 'Zero frequency. The example fan is stopped.'
      );
    } else if (selected === 3) {
      if (!m3.auto) {
        setStatusText('Automatic control off. The pump remains stopped.');
      } else if (m3.pump) {
        setStatusText('Low threshold reached. The PLC is filling the tank.');
      } else if (m3.level >= 85) {
        setStatusText('High threshold reached. The PLC stopped the pump.');
      } else {
        setStatusText('The PLC is monitoring the tank level.');
      }
    } else if (selected === 4) {
      if (m4.tripped) {
        if (m4.heat > 35) {
          setStatusText('Tripped. Allow the model to cool before resetting.');
        } else if (m4.load > 100) {
          setStatusText('Cooled. Reduce load to 100% or below, then reset.');
        } else {
          setStatusText('Cooled. You can now reset the trip.');
        }
      } else if (m4.load > 100) {
        setStatusText('Overload applied. The thermal model is accumulating heat.');
      } else {
        setStatusText('Load within the example limit. The motor is running.');
      }
    } else if (selected === 5) {
      setStatusText(
        m5.on
          ? 'Correction enabled. Less apparent power and line current for the same active load.'
          : 'Correction off. The example load has a power factor of 0.78.'
      );
    }
  }, [selected, m0, m1, m2, m3, m4, m5]);

  const resetCurrentModel = () => {
    if (selected === 0) setM0({ closed: false, tripped: false });
    if (selected === 1) setM1({ on: false });
    if (selected === 2) setM2({ frequency: 30 });
    if (selected === 3) setM3({ level: 55, outlet: true, auto: true, pump: false });
    if (selected === 4) setM4({ load: 90, heat: 0, tripped: false });
    if (selected === 5) setM5({ on: false });
  };

  const handleStep = () => {
    for (let i = 0; i < 10; i++) {
      stepSimulation(0.1);
    }
  };

  const currentModel = AUTOMATION_MODELS[selected];

  // Model-specific Metrics Calculation
  const renderMetrics = () => {
    if (selected === 0) {
      return (
        <>
          <div>
            <span>Circuit state</span>
            <strong><b>{m0.closed ? 'Closed' : 'Open'}</b></strong>
          </div>
          <div>
            <span>Load</span>
            <strong><b>{m0.closed ? 'On' : 'Off'}</b></strong>
          </div>
          <div>
            <span>Trip</span>
            <strong><b>{m0.tripped ? 'Tripped' : 'Clear'}</b></strong>
          </div>
        </>
      );
    }
    if (selected === 1) {
      return (
        <>
          <div>
            <span>Coil</span>
            <strong><b>{m1.on ? 'On' : 'Off'}</b></strong>
          </div>
          <div>
            <span>Contacts</span>
            <strong><b>{m1.on ? 'Closed' : 'Open'}</b></strong>
          </div>
          <div>
            <span>Motor</span>
            <strong><b>{m1.on ? 'Running' : 'Stopped'}</b></strong>
          </div>
        </>
      );
    }
    if (selected === 2) {
      const n = m2.frequency / 50;
      const speed = Math.round(1450 * n);
      const fanPower = Math.round(n * n * n * 100);
      return (
        <>
          <div>
            <span>Frequency</span>
            <strong><b>{m2.frequency}</b><small>Hz</small></strong>
          </div>
          <div>
            <span>Example speed</span>
            <strong><b>{speed}</b><small>rpm</small></strong>
          </div>
          <div>
            <span>Ideal fan power</span>
            <strong><b>{fanPower}</b><small>%</small></strong>
          </div>
        </>
      );
    }
    if (selected === 3) {
      return (
        <>
          <div>
            <span>Tank level</span>
            <strong><b>{Math.round(m3.level)}</b><small>%</small></strong>
          </div>
          <div>
            <span>Pump</span>
            <strong><b>{m3.pump ? 'Running' : 'Stopped'}</b></strong>
          </div>
          <div>
            <span>Mode</span>
            <strong><b>{m3.auto ? 'Auto' : 'Off'}</b></strong>
          </div>
        </>
      );
    }
    if (selected === 4) {
      return (
        <>
          <div>
            <span>Motor load</span>
            <strong><b>{m4.load}</b><small>%</small></strong>
          </div>
          <div>
            <span>Thermal level</span>
            <strong><b>{Math.round(m4.heat)}</b><small>%</small></strong>
          </div>
          <div>
            <span>Motor</span>
            <strong><b>{m4.tripped ? 'Tripped' : 'Running'}</b></strong>
          </div>
        </>
      );
    }
    if (selected === 5) {
      const pf = m5.on ? 0.98 : 0.78;
      const kva = (100 / pf).toFixed(1);
      const current = ((100 / pf) * 1000 / (Math.sqrt(3) * 415)).toFixed(0);
      return (
        <>
          <div>
            <span>Active power</span>
            <strong><b>100</b><small>kW</small></strong>
          </div>
          <div>
            <span>Apparent power</span>
            <strong><b>{kva}</b><small>kVA</small></strong>
          </div>
          <div>
            <span>Line current</span>
            <strong><b>{current}</b><small>A</small></strong>
          </div>
        </>
      );
    }
    return null;
  };

  // Model-specific Controls
  const renderControls = () => {
    if (selected === 0) {
      return (
        <>
          <button
            className="toggle"
            id="breakerPower"
            type="button"
            aria-pressed={m0.closed}
            onClick={() => {
              setM0((prev) => {
                if (prev.tripped) {
                  return { closed: false, tripped: false };
                }
                return { ...prev, closed: !prev.closed };
              });
            }}
          >
            <i aria-hidden="true" />
            <span>
              {m0.tripped ? 'Reset breaker' : m0.closed ? 'Open breaker' : 'Close breaker'}
            </span>
          </button>
          <button
            className="demo-button warn"
            id="breakerFault"
            type="button"
            onClick={() => {
              if (!m0.closed) {
                setStatusText('Close the breaker before simulating a fault.');
                return;
              }
              setM0({ closed: false, tripped: true });
            }}
          >
            Simulate fault
          </button>
        </>
      );
    }
    if (selected === 1) {
      return (
        <button
          className="toggle"
          id="contactorStart"
          type="button"
          aria-pressed={m1.on}
          onClick={() => setM1((prev) => ({ on: !prev.on }))}
        >
          <i aria-hidden="true" />
          <span>Energise coil</span>
        </button>
      );
    }
    if (selected === 2) {
      return (
        <label className="slider-label" htmlFor="frequency">
          Frequency
          <input
            id="frequency"
            type="range"
            min={0}
            max={50}
            value={m2.frequency}
            onChange={(e) => setM2({ frequency: Number(e.target.value) })}
          />
          <output id="sliderOutput" htmlFor="frequency">
            {m2.frequency} Hz
          </output>
        </label>
      );
    }
    if (selected === 3) {
      return (
        <>
          <button
            className="toggle"
            id="tankOutlet"
            type="button"
            aria-pressed={m3.outlet}
            onClick={() => setM3((prev) => ({ ...prev, outlet: !prev.outlet }))}
          >
            <i aria-hidden="true" />
            <span>Outlet open</span>
          </button>
          <button
            className="toggle"
            id="tankAuto"
            type="button"
            aria-pressed={m3.auto}
            onClick={() => {
              setM3((prev) => {
                const auto = !prev.auto;
                const pump = auto ? prev.level <= 20 : false;
                return { ...prev, auto, pump };
              });
            }}
          >
            <i aria-hidden="true" />
            <span>Auto control</span>
          </button>
        </>
      );
    }
    if (selected === 4) {
      return (
        <>
          <label className="slider-label" htmlFor="motorLoad">
            Motor load
            <input
              id="motorLoad"
              type="range"
              min={50}
              max={150}
              value={m4.load}
              onChange={(e) => setM4((prev) => ({ ...prev, load: Number(e.target.value) }))}
            />
            <output id="sliderOutput" htmlFor="motorLoad">
              {m4.load} %
            </output>
          </label>
          <button
            className="demo-button"
            id="relayReset"
            type="button"
            onClick={() => {
              if (!m4.tripped) {
                setStatusText('The relay has not tripped. Increase the load to explore thermal accumulation.');
                return;
              }
              if (m4.heat > 35) {
                setStatusText('The model is still hot. Wait, or use Step while paused, to let it cool.');
                return;
              }
              if (m4.load > 100) {
                setStatusText('Reduce the load to 100% or below before resetting.');
                return;
              }
              setM4((prev) => ({ ...prev, tripped: false }));
            }}
          >
            Reset trip
          </button>
        </>
      );
    }
    if (selected === 5) {
      return (
        <button
          className="toggle"
          id="apfcEnabled"
          type="button"
          aria-pressed={m5.on}
          onClick={() => setM5((prev) => ({ on: !prev.on }))}
        >
          <i aria-hidden="true" />
          <span>Enable correction</span>
        </button>
      );
    }
    return null;
  };

  // SVGs for the 6 diagrams
  const renderDiagram = () => {
    if (selected === 0) {
      const isEnergized = m0.closed;
      return (
        <svg
          className={`diagram ${isEnergized ? 'energized' : ''}`}
          id="activeDiagram"
          viewBox="0 0 500 245"
          role="img"
          aria-label="Illustrative circuit breaker: source, switching contacts and a load"
        >
          <title>Illustrative circuit breaker: source, switching contacts and a load</title>
          <text x="61" y="53" className="svg-small">SUPPLY</text>
          <circle cx="61" cy="123" r="22" fill="#edf1e4" stroke="#607851" />
          <path d="M49 123q6-14 12 0t12 0" fill="none" stroke="#607851" strokeWidth="1.5" />
          <path className="wire" d="M83 123H178M271 123H391" />
          <path className="flow" d="M83 123H178M271 123H391" />
          <rect className="device" x="178" y="72" width="93" height="103" rx="9" />
          <rect x="189" y="84" width="71" height="77" rx="5" fill="#dde7cc" />
          <text x="224" y="100" className="svg-title">MCCB</text>
          <circle cx="213" cy="148" r="4" fill="#23472e" />
          <circle cx="213" cy="118" r="4" fill="#23472e" />
          <path
            id="breakerLever"
            d="M213 148V118"
            stroke="#193b2d"
            strokeWidth="6"
            strokeLinecap="round"
            transform={m0.closed ? 'rotate(0 213 148)' : 'rotate(42 213 148)'}
          />
          <rect
            id="breakerFlag"
            x="239"
            y="119"
            width="7"
            height="26"
            rx="2"
            fill={m0.tripped ? '#b26a4e' : m0.closed ? '#739846' : '#a8b99b'}
          />
          <circle cx="418" cy="123" r="36" fill="#e4ecd7" />
          <circle
            className={`bulb ${m0.closed ? 'on' : ''}`}
            id="loadBulb"
            cx="418"
            cy="123"
            r="23"
            stroke="#5d7849"
            strokeWidth="1.2"
          />
          <path d="m406 111 24 24m-24 0 24-24" stroke="#607851" strokeWidth="1.2" />
          <text x="61" y="192">415 V example</text>
          <text x="224" y="198">Protective switch</text>
          <text x="418" y="192">Load</text>
        </svg>
      );
    }

    if (selected === 1) {
      const isEnergized = m1.on;
      return (
        <svg
          className={`diagram ${isEnergized ? 'energized' : ''}`}
          id="activeDiagram"
          viewBox="0 0 500 245"
          role="img"
          aria-label="Illustrative contactor: control coil closes main contacts to run a motor"
        >
          <title>Illustrative contactor: control coil closes main contacts to run a motor</title>
          <text x="71" y="52" className="svg-small">CONTROL SIGNAL</text>
          <path className="wire" d="M55 75H200M282 75H430" />
          <path className="flow" d="M55 75H200M282 75H430" />
          <rect
            id="contactorCoil"
            className="device"
            x="200"
            y="56"
            width="82"
            height="39"
            rx="7"
            style={{ fill: m1.on ? '#d5ed86' : '' }}
          />
          <text x="241" y="80" className="svg-title">COIL</text>
          <path d="M241 95v52" stroke="#718761" strokeDasharray="3 5" />
          <path className="wire" d="M55 166H204M278 166H381" />
          <path className="flow" d="M55 166H204M278 166H381" />
          <circle cx="204" cy="166" r="4" fill="#314d27" />
          <circle cx="278" cy="166" r="4" fill="#314d27" />
          <path
            id="contactorContact"
            d="M204 166h74"
            stroke="#193b2d"
            strokeWidth="5"
            strokeLinecap="round"
            transform={m1.on ? 'translate(0 0)' : 'translate(0 -17)'}
          />
          {/* Motor Rotor */}
          <g id="contactorMotor" className={m1.on ? 'running' : ''}>
            <circle cx="421" cy="166" r="34" fill="#e6edda" stroke="#adbf99" />
            <circle cx="421" cy="166" r="26" fill="#f6f8f0" stroke="#48633b" strokeWidth="1.2" />
            <g className="rotating">
              <path
                d="M421 147V185M402 166H440"
                stroke="#547743"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="421" cy="166" r="5" fill="#193b2d" />
            </g>
          </g>
          <text x="70" y="192">Power circuit</text>
          <text x="241" y="213">Main contacts</text>
          <text x="421" y="219">Motor</text>
        </svg>
      );
    }

    if (selected === 2) {
      const isEnergized = m2.frequency > 0;
      let wave = '';
      for (let x = 0; x <= 180; x += 2) {
        const y =
          119 -
          (m2.frequency
            ? 26 * Math.sin((x / 180) * (m2.frequency / 9) * Math.PI * 2)
            : 0);
        wave += (x === 0 ? 'M' : 'L') + (48 + x) + ' ' + y;
      }

      return (
        <svg
          className={`diagram ${isEnergized ? 'energized' : ''}`}
          id="activeDiagram"
          viewBox="0 0 500 245"
          role="img"
          aria-label="Illustrative drive frequency waveform and variable-speed fan"
        >
          <title>Illustrative drive frequency waveform and variable-speed fan</title>
          <rect className="device" x="35" y="62" width="206" height="128" rx="11" />
          <rect x="48" y="75" width="180" height="89" rx="6" fill="#fbfcf6" />
          <path d="M48 119H228" stroke="#d1dec4" strokeDasharray="3 4" />
          <path id="frequencyWave" d={wave} fill="none" stroke="#486d30" strokeWidth="2.1" />
          <text x="137" y="179" className="svg-small">OUTPUT WAVEFORM</text>
          <path className="wire" d="M241 125H335" />
          <path className="flow" d="M241 125H335" />
          <circle cx="392" cy="125" r="51" fill="#e6edda" stroke="#91a97c" />
          <circle cx="392" cy="125" r="41" fill="#f6f8f0" stroke="#b5c5a6" />
          <g
            id="fanBlades"
            ref={fanRef}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <circle cx="392" cy="125" r="40" fill="transparent" />
            <path
              d="M392 118c-31-5-24-37-8-32 13 4 15 20 8 32Z"
              fill="#6a8d51"
            />
            <path
              d="M392 118c-31-5-24-37-8-32 13 4 15 20 8 32Z"
              transform="rotate(120 392 125)"
              fill="#6a8d51"
            />
            <path
              d="M392 118c-31-5-24-37-8-32 13 4 15 20 8 32Z"
              transform="rotate(240 392 125)"
              fill="#6a8d51"
            />
          </g>
          <circle cx="392" cy="125" r="7" fill="#193b2d" />
          <text x="392" y="200" className="svg-small">FAN LOAD</text>
          <text x="137" y="218">Frequency changes speed</text>
        </svg>
      );
    }

    if (selected === 3) {
      const isEnergized = m3.pump;
      const height = m3.level * 1.43;
      return (
        <svg
          className={`diagram ${isEnergized ? 'energized' : ''}`}
          id="activeDiagram"
          viewBox="0 0 500 245"
          role="img"
          aria-label="Illustrative PLC tank-level control and HMI indicators"
        >
          <title>Illustrative PLC tank-level control and HMI indicators</title>
          <rect className="device" x="44" y="42" width="122" height="151" rx="7" />
          <clipPath id="tankClip">
            <rect x="48" y="46" width="114" height="143" rx="4" />
          </clipPath>
          <g clipPath="url(#tankClip)">
            <rect
              id="tankWater"
              x="48"
              y={189 - height}
              width="114"
              height={height}
              fill="#abc9a0"
            />
            <path d="M48 69H162M48 160H162" stroke="#5a7845" strokeDasharray="4 4" />
          </g>
          <text x="105" y="218">Process tank</text>
          <text x="183" y="71" className="svg-small">HIGH</text>
          <text x="183" y="162" className="svg-small">LOW</text>
          <path className="wire" d="M166 179H223M277 179H316V83H333" />
          <path className="flow" d="M166 179H223M277 179H316V83H333" />
          {/* Pump Rotor */}
          <g id="tankPump" className={m3.pump ? 'running' : ''}>
            <circle cx="250" cy="179" r="28" fill="#e6edda" stroke="#adbf99" />
            <circle cx="250" cy="179" r="20" fill="#f6f8f0" stroke="#48633b" strokeWidth="1.2" />
            <g className="rotating">
              <path
                d="M250 166V192M237 179H263"
                stroke="#547743"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="250" cy="179" r="5" fill="#193b2d" />
            </g>
          </g>
          <rect className="device" x="333" y="44" width="135" height="137" rx="10" />
          <rect x="344" y="58" width="113" height="102" rx="4" fill="#153c2a" />
          <text x="401" y="78" className="svg-small">TANK LEVEL</text>
          <text
            id="hmiLevel"
            x="401"
            y="111"
            style={{ fill: '#d5ed86', fontSize: '28px', fontWeight: 500 }}
          >
            {Math.round(m3.level)}%
          </text>
          <circle
            id="hmiLow"
            cx="365"
            cy="139"
            r="4"
            fill={m3.level <= 20 ? '#e3a171' : '#4c6643'}
          />
          <circle
            id="hmiHigh"
            cx="400"
            cy="139"
            r="4"
            fill={m3.level >= 85 ? '#d5ed86' : '#4c6643'}
          />
          <circle
            id="hmiPump"
            cx="437"
            cy="139"
            r="4"
            fill={m3.pump ? '#d5ed86' : '#4c6643'}
          />
          <text x="401" y="205">PLC / HMI</text>
          <text x="250" y="225">Pump</text>
        </svg>
      );
    }

    if (selected === 4) {
      const isEnergized = !m4.tripped;
      return (
        <svg
          className={`diagram ${isEnergized ? 'energized' : ''}`}
          id="activeDiagram"
          viewBox="0 0 500 245"
          role="img"
          aria-label="Illustrative thermal overload accumulation and motor trip"
        >
          <title>Illustrative thermal overload accumulation and motor trip</title>
          <path className="wire" d="M38 119H153M300 119H388" />
          <path className="flow" d="M38 119H153M300 119H388" />
          <rect className="device" x="153" y="60" width="147" height="120" rx="10" />
          <text x="226" y="87" className="svg-small">THERMAL MEMORY</text>
          <rect x="174" y="104" width="105" height="13" rx="4" fill="#d4dfc8" />
          <rect
            id="thermalHeat"
            x="174"
            y="104"
            width={(105 * m4.heat) / 100}
            height="13"
            rx="4"
            fill={m4.heat > 70 ? '#ba7051' : '#679143'}
          />
          <text x="181" y="137" className="svg-small">COOL</text>
          <text x="269" y="137" className="svg-small">TRIP</text>
          <circle
            id="thermalLamp"
            cx="226"
            cy="159"
            r="4"
            fill={m4.tripped ? '#ba7051' : '#8da776'}
          />
          {/* Relay Motor */}
          <g id="relayMotor" className={!m4.tripped ? 'running' : ''}>
            <circle cx="429" cy="119" r="36" fill="#e6edda" stroke="#adbf99" />
            <circle cx="429" cy="119" r="28" fill="#f6f8f0" stroke="#48633b" strokeWidth="1.2" />
            <g className="rotating">
              <path
                d="M429 98V140M408 119H450"
                stroke="#547743"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="429" cy="119" r="5" fill="#193b2d" />
            </g>
          </g>
          <text x="226" y="210">Overload protection</text>
          <text x="429" y="181">Motor</text>
        </svg>
      );
    }

    if (selected === 5) {
      const isEnergized = m5.on;
      const pf = m5.on ? 0.98 : 0.78;
      const kva = 100 / pf;
      return (
        <svg
          className={`diagram ${isEnergized ? 'energized' : ''}`}
          id="activeDiagram"
          viewBox="0 0 500 245"
          role="img"
          aria-label="Illustrative active and apparent power comparison for power-factor correction"
        >
          <title>Illustrative active and apparent power comparison for power-factor correction</title>
          <text x="40" y="50" className="svg-small" style={{ textAnchor: 'start' }}>
            ACTIVE POWER — USEFUL LOAD
          </text>
          <rect x="40" y="65" width="280" height="20" rx="5" fill="#4d7139" />
          <text x="335" y="80" className="svg-title" style={{ textAnchor: 'start' }}>100 kW</text>
          <text x="40" y="126" className="svg-small" style={{ textAnchor: 'start' }}>
            APPARENT POWER — SUPPLY DEMAND
          </text>
          <rect x="40" y="141" width="375" height="20" rx="5" fill="#e3e7d6" />
          <rect
            id="apparentBar"
            x="40"
            y="141"
            width={kva * 2.9}
            height="20"
            rx="5"
            fill={m5.on ? '#74984e' : '#a3b67c'}
          />
          <text x="40" y="198" className="svg-small" style={{ textAnchor: 'start' }}>
            S = P / PF
          </text>
          <text id="apfcDiagramPF" x="433" y="211" className="svg-big">
            {pf.toFixed(2)}
          </text>
          <text x="433" y="229" className="svg-small">POWER FACTOR</text>
        </svg>
      );
    }

    return null;
  };

  return (
    <section className="lab" id="how-they-work" aria-labelledby="labTitle">
      <div className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">Products in action</p>
            <h2 id="labTitle">
              Don&apos;t just see it.
              <br />
              <em>See it work.</em>
            </h2>
          </div>
          <div className="lab-intro">
            <p>Choose a component. Change a control. See how the system responds.</p>
          </div>
        </div>

        <div className="lab-grid">
          <div>
            <div
              className="lab-tabs"
              id="labTabs"
              role="tablist"
              aria-label="Working models"
            >
              {AUTOMATION_MODELS.map((m, i) => (
                <button
                  key={i}
                  className="lab-tab"
                  type="button"
                  role="tab"
                  id={`labTab${i}`}
                  aria-controls="demoRoot"
                  aria-selected={selected === i}
                  tabIndex={selected === i ? 0 : -1}
                  data-model={i}
                  onClick={() => setSelected(i)}
                  onKeyDown={(e) => {
                    let next = i;
                    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                      next = (i + 1) % AUTOMATION_MODELS.length;
                    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                      next = (i - 1 + AUTOMATION_MODELS.length) % AUTOMATION_MODELS.length;
                    } else if (e.key === 'Home') {
                      next = 0;
                    } else if (e.key === 'End') {
                      next = AUTOMATION_MODELS.length - 1;
                    } else {
                      return;
                    }
                    e.preventDefault();
                    setSelected(next);
                    document.getElementById(`labTab${next}`)?.focus();
                  }}
                >
                  <span className="num">0{i + 1}</span>
                  <strong>{m.title}</strong>
                  <small>{m.short}</small>
                  {/* <svg className="icon" aria-hidden="true">
                    <use href="#i-ne" />
                  </svg> */}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`lab-stage ${isPaused ? 'lab-paused' : ''}`}
            id="labStage"
            ref={stageRef}
          >
            <div className="stage-top">
              <span className="mono" id="modelIndex">
                MODEL 0{selected + 1} / {currentModel.category.toUpperCase()}
              </span>
              <div className="stage-top-actions">
                <button
                  id="simStep"
                  type="button"
                  hidden={!isPaused || !(selected === 3 || selected === 4)}
                  onClick={handleStep}
                >
                  Step +1s
                </button>
                <button
                  id="simPause"
                  type="button"
                  aria-pressed={isPaused}
                  onClick={() => setIsPaused((prev) => !prev)}
                >
                  <svg className="icon" aria-hidden="true">
                    <use href={isPaused ? '#i-play' : '#i-pause'} />
                  </svg>
                  <span>{isPaused ? 'Resume' : 'Pause'}</span>
                </button>
                <button id="simReset" type="button" onClick={resetCurrentModel}>
                  <svg className="icon" aria-hidden="true">
                    <use href="#i-reset" />
                  </svg>
                  Reset
                </button>
              </div>
            </div>

            <div
              id="demoRoot"
              role="tabpanel"
              aria-labelledby={`labTab${selected}`}
              className={!isReducedMotion ? 'model-transition' : ''}
              key={selected}
            >
              <div className="demo-head">
                <div>
                  <h3>{currentModel.title}</h3>
                  <p>{currentModel.description}</p>
                </div>
                <div className="demo-product">
                  <img
                    src={
                      AUTOMATION_IMAGES[currentModel.image] ||
                      `/assets/automation/${currentModel.image}.png`
                    }
                    alt={`${currentModel.family} brochure reference`}
                    width={108}
                    height={80}
                  />
                </div>
              </div>

              <div className="diagram-wrap">
                <span className="diagram-meta">Illustrative principle</span>
                {renderDiagram()}
              </div>

              <div className="demo-metrics">{renderMetrics()}</div>

              <div className="demo-controls">{renderControls()}</div>

              <p
                className="demo-status"
                id="demoStatus"
                role="status"
                aria-live="polite"
              >
                {statusText}
              </p>

              <p className="demo-explainer">{currentModel.note}</p>

              <div className="demo-bottom">
                <span>{currentModel.family}</span>
                <button
                  id="enquireModel"
                  type="button"
                  onClick={() => onOpenEnquiry(currentModel.family)}
                >
                  Explore this requirement
                  <svg className="icon" aria-hidden="true">
                    <use href="#i-ne" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lab-foot">
          <span>Interactive demonstrations · illustrative values</span>
          <button
            className="text-link"
            id="modelNotes"
            type="button"
            style={{
              background: 'transparent',
              color: 'inherit',
              fontSize: '11px',
              cursor: 'pointer',
              border: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onClick={onOpenNotes}
          >
            About these models
            <svg
              className="icon"
              aria-hidden="true"
              style={{ width: '12px', height: '12px' }}
            >
              <use href="#i-ne" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
