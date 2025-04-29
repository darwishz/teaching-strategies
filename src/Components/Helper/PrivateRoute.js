import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { auth }     from '../../firebaseConfig';

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setAllowed(!!user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;        // or a spinner
  return allowed
    ? children
    : <Navigate to="/login" replace />;
}
