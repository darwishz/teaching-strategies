import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/hns.css';

export default function DiscussionForum() {
  return (
    <main className="hns-page">
      <section className="hns-detail">
        <h2>Discussion Forum</h2>
        {/* TODO: embed or link to your forum here */}
        <Link to="/help-support" className="hns-back-button">← Back</Link>
      </section>
    </main>
  );
}
