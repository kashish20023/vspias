import React from 'react';
import Link from 'next/link';

export function ManufacturingProcess(): JSX.Element {
  return (
    <section className="section dark" id="production-section">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Complete paper bag manufacturing solutions</div>
            <h2>
              From a paper roll<br />to a finished bag.
            </h2>
          </div>
          <p>
            Starting a new line or exploring the next step? Let us help you select suitable machinery and configurations for your requirements.
          </p>
        </div>

        <div className="process">
          <div className="process-item">
            <div className="process-number">
              <span>01 / CONFIGURE</span>
              <span>↗</span>
            </div>
            <h3>
              Paper bag<br />machine
            </h3>
            <p>Discuss bag style, dimensions and required production capacity.</p>
          </div>

          <div className="process-item">
            <div className="process-number">
              <span>02 / PERSONALISE</span>
              <span>↗</span>
            </div>
            <h3>Printing</h3>
            <p>Explore flexographic printing and colour configurations.</p>
          </div>

          <div className="process-item">
            <div className="process-number">
              <span>03 / PRODUCE</span>
              <span>↗</span>
            </div>
            <h3>Production</h3>
            <p>Align materials and machine configuration with your output needs.</p>
          </div>

          <div className="process-item">
            <div className="process-number">
              <span>04 / DELIVER THE IDEA</span>
              <span>↗</span>
            </div>
            <h3>
              Finished<br />paper bag
            </h3>
            <p>Define the finished bag and application before finalising the setup.</p>
          </div>
        </div>

        <div className="process-foot">
          <p>One connected conversation, from requirements to configuration.</p>
          <Link href="/contact" className="button lime" id="discuss-production-line-btn">
            Discuss Your Production Line <span className="arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
