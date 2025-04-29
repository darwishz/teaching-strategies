// src/Components/Pages/Login/Login.js
import React, { useState } from 'react';
import { useNavigate }           from 'react-router-dom';
import { auth, db }              from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';

import CloseEye from '../../../assets/Images/close-eye.png';
import OpenEye  from '../../../assets/Images/open-eye.png';

import '../../css/login_styles.css';
import '../../css/helper.css';

export default function Login() {
  const [identifier, setIdentifier] = useState('');
  const [password,   setPassword]   = useState('');
  const [error,      setError]      = useState('');
  const [showPwd,    setShowPwd]    = useState(false);
  const navigate = useNavigate();

  const handleTogglePwd = () => setShowPwd(v => !v);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      let emailToUse = identifier.trim();
      if (!emailToUse.includes('@')) {
        const usersRef = collection(db, 'user_form');
        const q = query(usersRef, where('username','==',emailToUse));
        const snap = await getDocs(q);
        if (snap.empty) throw new Error();
        emailToUse = snap.docs[0].data().email;
      }
      await signInWithEmailAndPassword(auth, emailToUse, password);
      sessionStorage.setItem(
        'username',
        identifier.includes('@') ? emailToUse.split('@')[0] : identifier
      );
      navigate('/home');
    } catch {
      setError('Username/Email and password do not matched. Please try again.');
    }
  };

  return (
    <main>
      <div className="row">
        <div className="column left"></div>
        <div className="column middle">
          <h2 style={{textAlign:'center'}}>Sign In</h2>
          <p style={{textAlign:'center'}}>Sign in to your account to use our service</p>

          <form className="styled-form" onSubmit={handleSubmit}>
            {error && <div className="error-msg">{error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Username/Email</label>
                <input
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="Enter your username/email"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Password</label>
                <div className="password-container">
                  <input
                    type={showPwd?'text':'password'}
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <img
                    src={showPwd?OpenEye:CloseEye}
                    alt="Toggle"
                    className="toggle-icon"
                    onClick={handleTogglePwd}
                  />
                </div>
                <a href="/reset-password" className="forgot-password">Forgot password?</a>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="sign-btn">Sign In</button>
            </div>

            <p style={{ textAlign:'center' }}>
              Don’t have an account? <a href="/register">Sign up</a> now.
            </p>
          </form>
        </div>
        <div className="column right"></div>
      </div>
    </main>
  );
}
