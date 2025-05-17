// src/Components/Pages/Features/MyQuizzes.jsx
import React, { useState, useEffect } from 'react';
import { Link }                       from 'react-router-dom';
import { auth, db }                   from '../../../firebaseConfig';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import '../../css/quiz-generator.css'; // reuse some styles

export default function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(
      collection(db, 'users', user.uid, 'quizzes'),
      orderBy('createdAt', 'desc')
    );
    return onSnapshot(q, snap => {
      setQuizzes(
        snap.docs.map(d => ({
          id: d.id,
          ...d.data(),
          createdAt: d.data().createdAt?.toDate()
        }))
      );
    });
  }, []);

  if (!auth.currentUser) {
    return <p style={{ padding: 20 }}>Please sign in to see your quizzes.</p>;
  }

  return (
    <div className="quiz-gen-layout">
      <div className="quiz-gen-card">
        <Link to="/features" className="quiz-gen-back-btn">
          ← Back to Features
        </Link>
        <h1>My Saved Quizzes</h1>
        {quizzes.length === 0 ? (
          <p>No saved quizzes yet.</p>
        ) : (
          quizzes.map((qz, i) => (
            <div key={qz.id} className="quiz-gen-question">
              <div className="q-header">
                <span>
                  Quiz {i+1} — {qz.createdAt.toLocaleString()}
                </span>
              </div>
              <Link
                to="/features/quiz-generator"
                state={{ quiz: qz }}
                className="action-btn"
              >
                Load into Editor
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
