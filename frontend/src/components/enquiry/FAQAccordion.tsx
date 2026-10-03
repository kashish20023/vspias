import React from 'react';

import { FAQS } from '@/content/enquiry';

export function FAQAccordion(): JSX.Element {
  return (
    <section className="faq" id="faq-section">
      <h3>A few useful answers.</h3>
      {FAQS.map((faq, index) => (
        <details key={faq.question} open={index === 0}>
          <summary>{faq.question}</summary>
          <p>{faq.answer}</p>
        </details>
      ))}
    </section>
  );
}
