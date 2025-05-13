// src/Components/Pages/HelpAndSupport/HnS_Page.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/hns.css';

export default function HelpAndSupport() {
  return (
    <main className="hns-layout">
      <div className="column left" />
      <div className="column middle">
        <div className="hns-card">
          <section className="hns-header">
            <h1>Help &amp; Support</h1>
            <p className="hns-description">
              Welcome to EduInsight’s support center!  
              Whether you need answers about our teaching-strategy recommendations,  
              want to get in touch, or wish to join the conversation with fellow educators,  
              you’re in the right place.
            </p>
          </section>

          <section className="hns-overview">
            <Link to="/help-support/faq"        className="hns-button">FAQ</Link>
            <Link to="/help-support/contact-us" className="hns-button">Contact Us</Link>
            <Link to="/help-support/discussion" className="hns-button">Discussion Forum</Link>
          </section>
        </div>
      </div>
      <div className="column right" />
    </main>
  );
}
