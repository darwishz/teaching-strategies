import React, { useState } from "react";
import "../../css/contact_styles.css";
import "../../css/hci.css";
import "../../css/helper.css";

function Contact() {
  const [faqs, setFaqs] = useState([
    {
      question: "How can I sign up for an account?",
      answer: "Click the 'Sign In/Up' button in the navigation bar and complete the registration form.",
      open: false,
    },
    {
      question: "What teaching strategies does this platform recommend?",
      answer: "The platform uses AI to recommend personalized teaching strategies tailored to student needs.",
      open: false,
    },
    {
      question: "How can I contact support?",
      answer: "You can reach us at darwishzailani@gmail.com or use the contact form above.",
      open: false,
    },
    {
      question: "Can I collaborate with other educators?",
      answer: "Yes! Our platform offers features to collaborate with educators by sharing resources and strategies.",
      open: false,
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq, i) =>
        i === index ? { ...faq, open: !faq.open } : { ...faq, open: false }
      )
    );
  };

  return (
    <div>
      <main>
        {/* Contact Section */}
        <div className="contact_box">
          <h1>Contact Us</h1>
          <div className="contact-info">
            <div className="info-item">
              <>
                <img
                  src={require("../../../assets/Images/contact_icon.png")}
                  alt="contact"
                  style={{ float: "left", marginRight: "25px" }}
                />
                011-1029 2802
              </>
            </div>
            <div className="info-item">
              <p>
                <img
                  src={require("../../../assets/Images/email_icon.png")}
                  alt="email"
                  style={{ float: "left", marginRight: "25px" }}
                />
                darwishzailani@gmail.com
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="social-media">
            <p>Visit Our Social Media Account</p>
            <div className="icons">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <img
                  src={require("../../../assets/Images/linkedin-icon.png")}
                  alt="LinkedIn"
                />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                <img
                  src={require("../../../assets/Images/instagram-icon.png")}
                  alt="Instagram"
                />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">
                <img
                  src={require("../../../assets/Images/youtube-icon.png")}
                  alt="YouTube"
                />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <img
                  src={require("../../../assets/Images/facebook-icon.png")}
                  alt="Facebook"
                />
              </a>
            </div>
          </div>

          <p style={{ paddingTop: "3em" }}>
            Please feel free to contact us by leaving a message below if you
            have any questions.
          </p>
        </div>

        {/* Contact Form Section */}
        <div className="input_box">
          <form className="styled-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="full-name">Full Name</label>
                <input
                  type="text"
                  id="full-name"
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Enter your email" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                placeholder="Enter the subject"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                placeholder="Enter your message"
              ></textarea>
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  document.querySelector("form").reset();
                }}
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h2>Frequently Asked Questions (FAQ)</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${faq.open ? "open" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h4>{faq.question}</h4>
                </div>
                {faq.open && <div className="faq-answer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="empty">
          {/* Placeholder div for alignment */}
        </div>
      </main>
    </div>
  );
}

export default Contact;
