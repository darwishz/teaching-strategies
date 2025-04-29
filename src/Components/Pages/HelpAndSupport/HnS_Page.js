// src/Components/Pages/HelpAndSupport/HnS_Page.js
import React from 'react';
import FAQ      from './FAQ';
import Forum    from './Forum';
import '../../css/contact_styles.css';
import '../../css/helper.css';

export default function HelpAndSupport() {
  return (
    <main>
      <section className="help-support">
        <h2>Help &amp; Support</h2>
        {/* You can put tabs or sections here */}
        <FAQ />
        <Forum />
      </section>
    </main>
  );
}
