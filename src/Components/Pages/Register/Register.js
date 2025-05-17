// src/Components/Pages/Register/Register.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc
} from 'firebase/firestore';

import '../../css/signin_styles.css';
import '../../css/helper.css';

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate all fields, uniqueness, password match/length, checkbox
  const validate = async () => {
    const e = {};

    if (!username.trim()) {
      e.username = 'Username is required.';
    } else {
      const q = query(
        collection(db, 'user_form'),
        where('username', '==', username.trim())
      );
      if (!(await getDocs(q)).empty) {
        e.username = 'This username has been taken. Please use other username.';
      }
    }

    if (!email.trim()) {
      e.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      e.email = 'Invalid email format.';
    } else {
      const q = query(
        collection(db, 'user_form'),
        where('email', '==', email.trim())
      );
      if (!(await getDocs(q)).empty) {
        e.email = 'This email has been taken. Please use other email.';
      }
    }

    if (password.length < 8) {
      e.password = 'Password must be at least 8 characters.';
    }
    if (password !== cpassword) {
      e.cpassword = 'Passwords do not match!';
    }
    if (!terms) {
      e.terms = 'Please tick this before proceeding.';
    }

    return e;
  };

  // On form submit: validate, then create Firebase auth user + Firestore doc
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const v = await validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await setDoc(doc(db, 'user_form', res.user.uid), {
        username: username.trim(),
        email: email.trim()
      });
      navigate('/login', {
        state: { welcome_msg: 'Thanks for signing up. You may now sign in.' }
      });
    } catch (err) {
      setErrors({ firebase: err.message });
    }
  };

  return (
    <main>
      <div className="row">
        <div className="column left"></div>
        <div className="column middle">
          <h2 style={{ textAlign: 'center' }}>Sign Up</h2>
          <p style={{ textAlign: 'center' }}>
            Create a free account to use our service
          </p>

          <form onSubmit={handleSubmit}>
            <table className="styled-form">
              <tbody>
                <tr className="form-row">
                  <td className="form-group">
                    <label>Username</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                    {errors.username && (
                      <span className="error-msg">{errors.username}</span>
                    )}
                  </td>
                  <td className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                    {errors.email && (
                      <span className="error-msg">{errors.email}</span>
                    )}
                  </td>
                </tr>

                <tr className="form-row">
                  <td className="form-group">
                    <label>Password</label>
                    <div className="password-container">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>
                    {errors.password && (
                      <span className="error-msg">{errors.password}</span>
                    )}
                  </td>
                  <td className="form-group">
                    <label>Confirm Password</label>
                    <div className="password-container">
                      <input
                        type="password"
                        value={cpassword}
                        onChange={(e) => setCPassword(e.target.value)}
                        placeholder="Re-enter your password"
                        required
                      />
                    </div>
                    {errors.cpassword && (
                      <span className="error-msg">{errors.cpassword}</span>
                    )}
                  </td>
                </tr>

                <tr className="form-row">
                  <td colSpan="2" className="form-group w-100">
                    <div className="checkbox-container">
                      <input
                        type="checkbox"
                        checked={terms}
                        onChange={(e) => setTerms(e.target.checked)}
                      />
                      <label>
                        I agree to the{' '}
                        <Link to="/terms" className="text-dark">
                          Terms
                        </Link>{' '}
                        and acknowledge the{' '}
                        <Link to="/privacy" className="text-dark">
                          Global Privacy Statement
                        </Link>
                        .
                      </label>
                      {errors.terms && (
                        <span className="error-msg">{errors.terms}</span>
                      )}
                    </div>
                  </td>
                </tr>

                {errors.firebase && (
                  <tr className="form-row">
                    <td colSpan="2">
                      <div className="error-msg">{errors.firebase}</div>
                    </td>
                  </tr>
                )}

                <tr className="form-row">
                  <td colSpan="2" className="form-group w-100">
                    <button type="submit" className="form-btn">
                      Sign Up
                    </button>
                    <p style={{ textAlign: 'center', marginTop: 10 }}>
                      Already have an account?{' '}
                      <Link to="/login">Sign in</Link>
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
        <div className="column right"></div>
      </div>
    </main>
  );
}
