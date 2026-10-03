import React from 'react';
import Image from 'next/image';
import { INDUSTRIES } from '@/content/industrial';

export function IndustriesSection(): JSX.Element {
  return (
    <section className="section" id="industries-section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Industrial applications</div>
            <h2>
              Built around<br />your industry.
            </h2>
          </div>
          <p>
            Discuss your application with a team that understands the importance of the right product and configuration.
          </p>
        </div>

        <div className="industries">
          {INDUSTRIES.map((item) => (
            <article key={item.title} className="industry">
              <Image
                src={item.image}
                alt={item.alt}
                width={240}
                height={138}
                style={{ width: '100%', height: '138px', objectFit: 'cover' }}
              />
              <h3>{item.title}</h3>
            </article>
          ))}
        </div>

        <span id="about" style={{ display: 'block', position: 'relative', top: '-110px', visibility: 'hidden' }} />
        <div className="about-strip" id="about-section">
          <h3>
            A practical partner.<br />A forward-looking focus.
          </h3>
          <p>
            VSPIAS Ecoautomation brings a professionally managed approach to sourcing electrical and industrial materials. Our next chapter puts paper bags, printing and manufacturing solutions at the centre of the conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
