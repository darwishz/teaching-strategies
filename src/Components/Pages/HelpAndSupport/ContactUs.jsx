// src/Components/Pages/HelpAndSupport/ContactUs.jsx

import React, { useState, useEffect } from 'react';
import { Link }                       
       from 'react-router-dom';
import { db }                         
       from '../../../firebaseConfig';
import { collection, addDoc, Timestamp } 
       from 'firebase/firestore';

// icons…
import contactIcon   from '../../../assets/Images/contact_icon.png';
import emailIcon     from '../../../assets/Images/email_icon.png';
import linkedinIcon  from '../../../assets/Images/linkedin-icon.png';
import instagramIcon from '../../../assets/Images/instagram-icon.png';
import youtubeIcon   from '../../../assets/Images/youtube-icon.png';
import facebookIcon  from '../../../assets/Images/facebook-icon.png';

// shared HnS layout + this page’s own CSS
import '../../css/hns.css';
import '../../css/contact.css';

export default function ContactUsHelp() {
  const [form,   setForm]   = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState(''); // '' | 'success' | 'error'

  // auto-clear the success/error banner after 3s
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    try {
      await addDoc(collection(db, 'contacts'), {
        ...form,
        createdAt: Timestamp.now()
      });
      setStatus('success');
      setForm({ name:'', email:'', subject:'', message:'' });
      // OPTION B: scroll the card into view
      document
        .querySelector('.contactus-card')
        ?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      document
        .querySelector('.contactus-card')
        ?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCancel = () => {
    setForm({ name:'', email:'', subject:'', message:'' });
    setStatus('');
  };

  return (
    <main className="hns-layout">
      <div className="column left" />
      <div className="column middle">
        <div className="hns-card contactus-card">

          {/* bottom-left back link */}
          <div className="contactus-back contactus-back-bottom">
            <Link to="/help-support" className="contactus-back-btn">
              ← Back to Help &amp; Support
            </Link>
          </div>

          {/* Header */}
          <header className="hns-header">
            <h1>Contact Us</h1>
            <p className="hns-description">
              Have questions about EduInsight’s recommendations or need assistance?<br/>
              Drop us a line below and we’ll get right back to you.
            </p>
          </header>

          {/* show success / error banner */}
{status === 'success' && (
  <div className="notification-box">
    Your message has been sent!
  </div>
)}
{status === 'error' && (
  <div className="error-box">
    Oops — there was a problem sending your message.
  </div>
)}

{/* fixed, center‐screen success toast */}
{status === 'success' && (
  <div className="center-notification">
    ✔️ Your message has been sent!
  </div>
)}

          {/* Content: Info + Form */}
          <div className="contact-container">
            {/* Left info */}
            <div className="contact-info-box">
              <h2>Get in Touch</h2>
              <div className="contact-info">
                <div className="info-item">
                  <img src={contactIcon} alt="Phone" className="icon"/>
                  <span>03-123 4567</span>
                </div>
                <div className="info-item">
                  <img src={emailIcon} alt="Email" className="icon"/>
                  <span>hcitig5@gmail.com</span>
                </div>
              </div>
              <p>Follow us for updates:</p>
              <div className="contactus-social">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <img src={linkedinIcon} alt="LinkedIn"/>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src={instagramIcon} alt="Instagram"/>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <img src={youtubeIcon} alt="YouTube"/>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src={facebookIcon} alt="Facebook"/>
                </a>
              </div>
            </div>

            {/* Right form */}
            <div className="contact-form-box">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-full">
                  <label htmlFor="subject">Subject</label>
                  <input
                    id="subject"
                    name="subject"
                    placeholder="Enter the subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group-full">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Enter your message"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="column right" />
    </main>
  );
}
