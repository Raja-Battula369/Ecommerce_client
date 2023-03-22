import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Refresh = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedPath = localStorage.getItem('refreshPath');
    if (storedPath) {
      localStorage.removeItem('refreshPath');
      if (storedPath === window.location.pathname) {
        navigate(storedPath);
      }
    }
  }, [navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      localStorage.setItem('refreshPath', window.location.pathname);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  return null;
};

export default Refresh;
