// src/Components/Pages/HelpAndSupport/FAQ.js
import React from 'react';
import { Link } from 'react-router-dom';

// Reuse the HnS layout & card styles
import '../../css/hns.css';
// FAQ‐specific styles (questions, back‐button, spacing)
import '../../css/faq.css';

export default function FAQ() {
  const faqs = [
    { q: 'How do I create an account?',
      a: 'Click “Sign Up” in the upper right, fill out your details…' },
    { q: 'I forgot my password—how can I reset it?',
      a: 'On the Sign In page, click “Forgot password?”…' },
    { q: 'How do I get my personalized teaching recommendations?',
      a: 'Once logged in, go to “Get Recommendation” from the nav bar…' },
    { q: 'Can I update my profile information?',
      a: 'Yes—visit “Profile” from the nav bar to edit your username or email…' },
    { q: 'Who can I contact for further help?',
      a: 'Use the “Contact Us” button on the Help & Support page…' },
  ];

  return (
    <main className="hns-layout">
      <div className="column left" />
      <div className="column middle">
        <div className="hns-card faq-card">
          {/* --- keep or remove this top one as you like --- */}
          {/* <div className="faq-back">
            <Link to="/help-support" className="faq-back-btn">
              ← Back to Help & Support
            </Link>
          </div> */}

          <header className="hns-header">
            <h1>Frequently Asked Questions</h1>
            <p className="hns-description">
              Can’t find the answer you need below? Feel free to reach out via our Contact Us page.
            </p>
          </header>

          <section className="faq-list">
            {faqs.map((item, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question">Q: {item.q}</div>
                <div className="faq-answer">A: {item.a}</div>
              </div>
            ))}
          </section>

          {/* --- bottom‐left back link --- */}
          <div className="faq-back-bottom">
            <Link to="/help-support" className="faq-back-btn">
              ← Back to Help & Support
            </Link>
          </div>
        </div>
      </div>
      <div className="column right" />
    </main>
  );
}
