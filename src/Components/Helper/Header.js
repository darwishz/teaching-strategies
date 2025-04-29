import React, { useState, useEffect } from 'react';
import { Link, useLocation }         from 'react-router-dom';
import { auth }                      from '../../firebaseConfig';
import '../css/helper.css';

export default function Header() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
      if (user) {
        sessionStorage.setItem(
          'username',
          user.displayName || user.email.split('@')[0]
        );
      } else {
        sessionStorage.removeItem('username');
      }
    });
    return unsubscribe;
  }, []);

  // Sticky navbar + active‐link highlighting
  useEffect(() => {
    const handleScroll = () => {
      const navBar = document.querySelector('.nav-bar');
      if (window.scrollY > 45) navBar.classList.add('sticky-top');
      else navBar.classList.remove('sticky-top');
    };
    window.addEventListener('scroll', handleScroll);

    const currentPath = location.pathname.replace(/\/$/, '');
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      const linkPath = link.getAttribute('href') || '';
      link.classList.toggle('active', currentPath === linkPath);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <div className="container-fluid nav-bar bg-transparent">
      <nav className="navbar navbar-expand-lg py-0 px-4">
        {/* Search */}
        <div className="col-md-4 nav-search-bar px-4">
          <input
            type="text"
            className="form-control border-0 py-3"
            placeholder="SEARCH"
          />
        </div>

        {/* Nav Links */}
        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarCollapse">
          <div className="navbar-nav ms-auto px-2">
            <Link to="/"             className="nav-item nav-link">Home</Link>
            <Link to="/getrec_pg1"   className="nav-item nav-link">Get Recommendation</Link>
            <Link to="/features"     className="nav-item nav-link">Features</Link>
            <Link to="/help-support" className="nav-item nav-link">Help & Support</Link>
            <Link to="/aboutus"      className="nav-item nav-link">About Us</Link>

            {isLoggedIn ? (
              <>
                <Link to="/profile" className="nav-item nav-link">Profile</Link>
                <Link to="/logout"  className="nav-item nav-link">Sign Out</Link>
              </>
            ) : (
              <Link to="/login"   className="nav-item nav-link">Sign In/Up</Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
