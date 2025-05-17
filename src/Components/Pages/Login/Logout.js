import { useEffect } from 'react';
import { useNavigate }      from 'react-router-dom';
import { auth }             from '../../../firebaseConfig';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    auth.signOut().then(() => {
      // Header’s listener will clear sessionStorage
      navigate('/login', { replace: true });
    });
  }, [navigate]);

  return null;
}
