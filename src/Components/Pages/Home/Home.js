// src/Components/Pages/Home/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate }            from 'react-router-dom';
import HomeBg                     from '../../../assets/Images/home-bg.png';
import '../../css/home.css';
import '../../css/helper.css';

export default function Home() {
  const navigate = useNavigate();
  const username = sessionStorage.getItem('username') || '';
  const [showNotification, setShowNotification] = useState(!!username);

  useEffect(() => {
    if (showNotification) {
      const t = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(t);
    }
  }, [showNotification]);

  return (
    <>
      {showNotification && (
        <div className="notification-box">
          Hi, {username}. Welcome to our website.
        </div>
      )}

      <main>
        <section className="hero text-center py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex flex-column justify-content-center">
                <h1 className="display-4 square-background">
                  Enhance <span className="teaching-text">Teaching</span> With Advanced Strategies
                </h1>
                <p className="lead">
                  Provide the <span className="effective-text">MOST EFFECTIVE</span> teaching methods
                </p>
                <button
                  className="btn btn-get-started btn-lg"
                  onClick={() => navigate('/getrec_pg1')}
                >
                  GET STARTED
                </button>
              </div>
              <div className="col-md-6 text-right">
                <img src={HomeBg} alt="Classroom" className="img-fluid" />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
