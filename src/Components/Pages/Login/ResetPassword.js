// src/Components/Pages/Login/ResetPassword.js
import React, { useState }       from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth }                  from '../../../firebaseConfig';

import '../../css/login_styles.css';
import '../../css/reset_password.css';
import '../../css/helper.css';

export default function ResetPassword() {
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState({ type:'', message:'' });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus({ type:'', message:'' });
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setStatus({ type:'success', message:'Reset email sent! Check your inbox.' });
    } catch(err) {
      setStatus({ type:'error', message: err.message || 'Failed to send reset email.' });
    }
  };

  return (
    <main>
      <div className="row">
        <div className="column left"></div>
        <div className="column middle reset-form-container">
          <h2 style={{textAlign:'center'}}>Reset Password</h2>

          <form className="reset-form" onSubmit={handleSubmit}>
            {status.message && status.type==='success' && (
              <div className="notification-box">{status.message}</div>
            )}
            {status.message && status.type==='error' && (
              <div className="error-msg">{status.message}</div>
            )}
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e=>setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="reset-btn">Send Reset Email</button>
          </form>

          <p style={{textAlign:'center', marginTop:15}}>
            <a href="/login">Back to Sign In</a>
          </p>
        </div>
        <div className="column right"></div>
      </div>
    </main>
  );
}
