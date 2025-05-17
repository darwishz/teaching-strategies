import React from 'react';
import { Link } from 'react-router-dom';

// Base Help&Support layout & button styles
import '../../css/hns.css';
// Feature-specific overrides (optional)
import '../../css/features.css';

export default function FeaturesLanding() {
  return (
    <main className="hns-layout">
      <div className="column left" />
      <div className="column middle">
        <div className="hns-card">
          <section className="hns-header">
            <h1>Features</h1>
            <p className="hns-description">
              Explore the tools in EduInsight designed to supercharge your  
              teaching practice—pick one to get started!
            </p>
          </section>

          <section className="hns-overview">
            <Link
              to="/features/repository"
              className="hns-button"
            >
              Teaching Repository
            </Link>
            <Link
              to="/features/quiz-generator"
              className="hns-button"
            >
              Quiz Generator
            </Link>
            <Link
              to="/features/analytics"
              className="hns-button"
            >
              Analytics Dashboard
            </Link>
          </section>
        </div>
      </div>
      <div className="column right" />
    </main>
  );
}
