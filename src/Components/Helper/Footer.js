// src/components/Footer.js
import React from "react";
import { Link } from "react-router-dom";
import "../css/helper.css";

function Footer() {
  return (
    <footer className="bg-white text-dark">
      <div className="container">
        <div className="row pt-5">
          {/* Contact Section */}
          <div className="col-md-4">
            <h3>CONTACT</h3>
            <div className="contact mt-2">Tel: +60 11-10292802</div>
            <div className="contact mt-1">
              Email: darwishzailani@gmail.com
            </div>
            <div className="social-icons mt-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark mr-3"
              >
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark mr-3"
              >
                <i className="fab fa-linkedin-in fa-lg"></i>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark mr-3"
              >
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark mr-3"
              >
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>

          {/* Logo Section */}
          <div className="col-md-4 text-center">
            <img
              src={require("../../assets/Images/HCIT1G5.png")}
              alt="HCI TIG5 Logo"
              className="img-fluid"
              style={{ maxWidth: "300px" }}
            />
          </div>

          {/* Quick Links */}
          <div className="col-md-4 d-flex justify-content-end">
            <div>
              <h3>QUICK LINKS</h3>
              <ul className="list-unstyled">
                <li>
                  <Link to="/" className="text-dark">
                    &gt; Home
                  </Link>
                </li>
                <li>
                  <Link to="/aboutus" className="text-dark">
                    &gt; About Us
                  </Link>
                </li>
                <li>
                  <Link to="/help-support" className="text-dark">
                    &gt; Help &amp; Support
                  </Link>
                </li>
                <li>
                  <Link to="/getrec_pg1" className="text-dark">
                    &gt; Get Recommendation
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col text-center">
            <p>&copy; 2024 HCI TIG5. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
