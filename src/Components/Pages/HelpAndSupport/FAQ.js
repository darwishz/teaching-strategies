// src/Components/Pages/HelpAndSupport/FAQ.js
import React from 'react';
import { Link } from 'react-router-dom';

// Reuse the HnS layout & card styles
import '../../css/hns.css';
// FAQ-specific styles (questions, back-button, spacing)
import '../../css/faq.css';

export default function FAQ() {
  // sample FAQs
  const faqs = [
    {
      q: 'How do I create an account?',
      a: 'Click “Sign Up” in the upper right, fill out your details, agree to the Terms, and submit.  You’ll receive a confirmation email—then you’re all set!'
    },
    {
      q: 'I forgot my password—how can I reset it?',
      a: 'On the Sign In page, click “Forgot password?”.  You’ll be prompted for your email and sent a reset link instantly.'
    },
    {
      q: 'How do I get my personalized teaching recommendations?',
      a: 'Once logged in, go to “Get Recommendation” from the nav bar and answer a few quick questions about your class.  We’ll generate tailored strategies for you!'
    },
    {
      q: 'Can I update my profile information?',
      a: 'Yes—visit “Profile” from the nav bar to edit your username or email.  Any changes will be saved immediately in Firebase.'
    },
    {
      q: 'Who can I contact for further help?',
      a: 'Use the “Contact Us” button on the Help & Support page (or email us at support@eduinsight.com) and we’ll get back to you within 24 hours.'
    },
  ];

  return (
    <main className="hns-layout">
      <div className="column left" />
      <div className="column middle">
        <div className="hns-card faq-card">
          {/* Back button */}
          <div className="faq-back">
            <Link to="/help-support" className="faq-back-btn">
              ← Back to Help & Support
            </Link>
          </div>

          {/* Page title */}
          <header className="hns-header">
            <h1>Frequently Asked Questions</h1>
            <p className="hns-description">
              Can’t find the answer you need below?  Feel free to reach out via our Contact Us page.
            </p>
          </header>

          {/* FAQ list */}
          <section className="faq-list">
            {faqs.map((item, i) => (
              <div className="faq-item" key={i}>
                <div className="faq-question">Q: {item.q}</div>
                <div className="faq-answer">A: {item.a}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
      <div className="column right" />
    </main>
  );
}
