import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
import { m } from 'framer-motion';
import useAuth from '../hooks/useAuth';
// routes
import { PATH_PROJECTS } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default function GuestGuard({ children }) {
  const [isShowSplash, setIsShowSplash] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setIsShowSplash(true);
    if (isAuthenticated) {
      setTimeout(() => {
        setIsShowSplash(false);
      }, 2000);
    }
  }, [isAuthenticated]);

  if (isAuthenticated && isShowSplash) {
    return (
      <m.div>
        <img src="/assets/Images/Splash.png" alt="Splash" style={{ width: '100vw', height: '100vh' }} />
      </m.div>
    );
  }

  if (isAuthenticated && !isShowSplash) {
    return <Navigate to={PATH_PROJECTS.root} />;
  }

  return <>{children}</>;
}
