import React, { useState, useEffect } from 'react';
import { useNavigate }             from 'react-router-dom';
import { auth, db }                from '../../../firebaseConfig';
import {
  updateProfile,
  updateEmail as fbUpdateEmail,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { doc, updateDoc, getDoc }  from 'firebase/firestore';

import '../../css/profile.css';
import '../../css/helper.css';

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Local state
  const [username, setUsername]         = useState('');
  const [email, setEmail]               = useState('');
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail]       = useState(false);

  // Load from Firestore on mount
  useEffect(() => {
    if (user) {
      // Firestore doc assumed at 'user_form/{uid}'
      const docRef = doc(db, 'user_form', user.uid);
      getDoc(docRef).then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          setUsername(data.username || user.displayName || '');
          setEmail(data.email    || user.email);
        } else {
          // fallback to Auth
          setUsername(user.displayName || '');
          setEmail(user.email || '');
        }
      });
    }
  }, [user]);

  // Save updated username
  const handleSaveUsername = async () => {
    try {
      // 1) Update Firestore
      const docRef = doc(db, 'user_form', user.uid);
      await updateDoc(docRef, { username });

      // 2) Update Auth displayName
      await updateProfile(user, { displayName: username });

      alert('Username updated!');
      setEditUsername(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update username: ' + err.message);
    }
  };

  // Save updated email
  const handleSaveEmail = async () => {
    try {
      // 1) Update Firebase Auth email
      await fbUpdateEmail(user, email);

      // 2) Update Firestore
      const docRef = doc(db, 'user_form', user.uid);
      await updateDoc(docRef, { email });

      alert('Email updated!');
      setEditEmail(false);
    } catch (err) {
      console.error(err);
      alert('Failed to update email: ' + err.message);
    }
  };

  // Send password reset
  const handleChangePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Password reset link sent to ${email}`);
    } catch (err) {
      console.error(err);
      alert('Failed to send password reset: ' + err.message);
    }
  };

  // Sign out
  const handleLogout = () => {
    auth.signOut().then(() => navigate('/login'));
  };

  // History stub
  const history = [
    {
      id:    1,
      image: require('../../../assets/Images/classroom.jpg'),
      name:  'Human Computer Interaction',
      level: "Bachelor's Degree – Year 1",
      type:  'Computer Science',
      date:  '27/10/2024',
    },
    {
      id:    2,
      image: require('../../../assets/Images/classroom.jpg'),
      name:  'Fundamentals of Programming',
      level: "Bachelor's Degree – Year 1",
      type:  'Computer Science',
      date:  '25/10/2024',
    },
  ];

  return (
    <div className="profile-page">
      {/* Inline background in CSS handles the classroom image */}
      <section className="profile-content">
        <div className="profile-form-col">
          <h2>Profile</h2>

          {/* Username row */}
          <div className="form-row">
            <label>Username</label>
            <div className="input-with-icon">
              <input
                type="text"
                value={username}
                readOnly={!editUsername}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            {editUsername ? (
              <i
                className="edit-icon fas fa-check-circle"
                style={{ color: '#28a745' }}
                onClick={handleSaveUsername}
              />
            ) : (
              <i
                className="edit-icon fas fa-pencil-alt"
                onClick={() => setEditUsername(true)}
              />
            )}
          </div>

          {/* Email row */}
          <div className="form-row">
            <label>Email</label>
            <div className="input-with-icon">
              <input
                type="email"
                value={email}
                readOnly={!editEmail}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            {editEmail ? (
              <i
                className="edit-icon fas fa-check-circle"
                style={{ color: '#28a745' }}
                onClick={handleSaveEmail}
              />
            ) : (
              <i
                className="edit-icon fas fa-pencil-alt"
                onClick={() => setEditEmail(true)}
              />
            )}
          </div>

          {/* Change password */}
          <div
            className="change-password"
            onClick={handleChangePassword}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            Change password
          </div>

          {/* Logout */}
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="profile-history-col">
          <h3>History</h3>
          <div className="history-list">
            {history.map(item => (
              <div key={item.id} className="history-card">
                <img src={item.image} alt={item.name} />
                <div className="history-info">
                  <p><strong>Course Name</strong> {item.name}</p>
                  <p><strong>Course Level</strong> {item.level}</p>
                  <p><strong>Course Type</strong> {item.type}</p>
                </div>
                <div className="history-date">
                  Generated on {item.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
