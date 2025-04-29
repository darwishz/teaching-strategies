// src/Components/Pages/AboutUs/AboutUs.js
import React from 'react';

// Images
import HeaderImg    from '../../../assets/Images/try.svg';
import ClassroomImg from '../../../assets/Images/classroom.jpg';
import TickIcon     from '../../../assets/Images/tick.svg';
import WorldMap     from '../../../assets/Images/worldmap.svg';
import StatsImg     from '../../../assets/Images/statistic.png';

// CSS
import '../../css/style.css';
import '../../css/hci.css';
import '../../css/helper.css';

export default function AboutUs() {
  const features = [
    { title: 'Tailored Solution',      text: 'Our tools are designed to meet the unique needs of each educator' },
    { title: 'User-friendly interface', text: 'Platform easy to navigate' },
    { title: 'Community Collaboration', text: 'Join a network of passionate educators who share resources' },
  ];

  return (
    <main>
      {/* === Header Image === */}
      <header className="header-image">
        <img
          src={HeaderImg}
          alt="About Us Header"
          className="top-image"
        />
      </header>

      {/* === About Us Content === */}
      <section>
        <h2 className="section-title">About Us</h2>
        <div className="about-us-content">
          <div className="about-us-image">
            <img
              src={ClassroomImg}
              alt="Classroom"
              className="img-fluid"
            />
          </div>
          <div className="about-us-text">
            <h3 className="sub-title">Why you should choose us?</h3>
            <h3 className="sub-title">Get to know about us!</h3>
            <p className="about-us-description">
              We aim to transform education with AI-powered tools, providing teachers
              personalized insights to improve student performance. Founded by
              university students and tech enthusiasts, we focus on instant feedback
              and easy integration to help educators use the best teaching methods
              for each student.
            </p>
            <div className="about-us-features">
              {features.map((feat, i) => (
                <div className="feature" key={i}>
                  <div className="feature-content">
                    <div className="left-column">
                      <img
                        src={TickIcon}
                        alt={feat.title}
                        className="feature-icon"
                      />
                    </div>
                    <div className="right-column">
                      <h4>{feat.title}</h4>
                      <div className="description">
                        <div className="bullet-point"></div>
                        <ul>
                          <li>{feat.text}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* === Worldwide User & Map === */}
      <div className="content-separator"></div>
      <div className="world">
        <h3 className="section-title-w">Worldwide User</h3>
        <p className="description">
          Our website is used by educators from around the world
          <br />
          to enhance their teaching skills
        </p>
      </div>
      <div className="two-column-container">
        <div className="column world-map">
          <img
            src={WorldMap}
            alt="World Map"
            className="world-map-img"
          />
        </div>
        <div className="empty-column">
          <img
            src={StatsImg}
            alt="Statistics"
            className="world-map-img"
          />
        </div>
      </div>
    </main>
  );
}
