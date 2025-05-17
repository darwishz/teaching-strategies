import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/repository.css';

// replace these imports with your real image paths
import activeImg       from '../../../assets/Images/Active Learning.png';
import personalizedImg from '../../../assets/Images/Personalised.png';
import peerImg         from '../../../assets/Images/Peer teaching.png';
import coopImg         from '../../../assets/Images/coorperative-learning-strategy 1.png';
import experImg        from '../../../assets/Images/Experiential strategy.png';

export default function Repository() {
  const features = [
    {
      title: '1. Active Learning strategy',
      description:
        'Active learning means students actively participate in activities like writing, discussing, problem-solving, or presenting, instead of just learning passively. This approach helps all students think, engage with the material, and practice skills like learning, applying, synthesizing, and summarizing.',
      benefits: [
        'Improve Retention and Understanding',
        'Enhanced Critical Thinking',
        'Increased Student Engagement',
      ],
      imageSrc: activeImg,
      videoSrc: 'https://www.youtube.com/embed/D8Wc3eSRaLE?si=dLYscBG5DvsEtMbI',
    },
    {
      title: '2. Personalized Learning strategy',
      description:
        'Each student receives a learning plan tailored to their knowledge, learning style, and interests. The plan includes ongoing feedback and adjustments to ensure progress. Personalized teaching adapts to each student’s pace and needs, boosting engagement, building confidence, and developing critical skills through tailored support.',
      benefits: [
        'Increased Motivation and Engagement',
        'Improved Learning Outcomes',
        'Tailored Learning Pace',
      ],
      imageSrc: personalizedImg,
      videoSrc: 'https://www.youtube.com/embed/6oLNLCO0vfI?si=JjTMqIf8d50VtcOH',
    },
    {
      title: '3. Peer Teaching strategy',
      description:
        'Peer teaching shifts the focus from the teacher to the student, encouraging students to take charge of their learning. By teaching concepts to their peers, students deepen their understanding, retain knowledge better, and gain confidence.',
      benefits: [
        'Enhanced Understanding and Retention',
        'Improved Communication Skills',
        'Boosts Confidence and Social Interaction',
      ],
      imageSrc: peerImg,
      videoSrc: 'https://www.youtube.com/embed/ScESS8dueLw?si=R7LzjV_3OMxK_hab',
    },
    {
      title: '4. Cooperative Learning strategy',
      description:
        'Group work is a cooperative learning strategy where 5-7 students collaborate on a task. They share and listen to ideas, then combine them to make the best decision. This approach improves communication and critical thinking skills.',
      benefits: [
        'Improved Social and Communication Skills',
        'Higher Retention and Academic Achievement',
        'Increased Engagement and Motivation',
      ],
      imageSrc: coopImg,
      videoSrc: 'https://www.youtube.com/embed/ZVcOOGqy9nI?si=j1HGMd5kGfJ3rysa',
    },
    {
      title: '5. Experiential strategy',
      description:
        'Experiential learning is a hands-on approach where students “learn by doing” and reflecting on their experiences. Activities like simulations, experiments, and real-world tasks encourage participation and collaboration. This method improves knowledge retention, critical thinking, problem-solving, teamwork, and real-world readiness.',
      benefits: [
        'Deeper Understanding',
        'Enhanced Problem Solving and Critical Thinking',
        'Increased Engagement and Motivation',
      ],
      imageSrc: experImg,
      videoSrc: 'https://www.youtube.com/embed/GDchcHORheM?si=ylc-nYv-oaYdcusM',
    },
  ];

  return (
    <main className="repository-layout">
        {/* ← Back to Features */}
      <div className="repo-back">
        <Link to="/features" className="repo-back-btn">
          ← Back to Features
        </Link>
      </div>
      <h1>Features</h1>
      {features.map((f, i) => (
        <section className="feature-section" key={i}>
          <div className="feature-content">
            <div className="image-container">
              <img src={f.imageSrc} alt={f.title} />
            </div>
            <div className="text-container">
              <div className="text-box title-box">
                <h2>{f.title}</h2>
              </div>
              <div className="text-box description-box">
                <p>{f.description}</p>
              </div>
              <div className="text-box benefits-title-box">
                <h3>Benefits</h3>
              </div>
              <div className="text-box benefits-box">
                <ul>
                  {f.benefits.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="video-container">
            <iframe
              src={f.videoSrc}
              title={f.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>
      ))}
    </main>
  );
}
