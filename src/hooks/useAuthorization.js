import { useState, useEffect } from 'react';
import { music, user } from '../services/music';

function useAuthorization() {
  const [isAuthorized, setIsAuthorized] = useState(user.isAuthorized);

  useEffect(() => {
    const handleChange = () => {
      setIsAuthorized(isAuthorized);
    }

    music.instance.addEventListener('authorizationStatusDidChange', handleChange);
    return () => {
      music.instance.removeEventListener('authorizationStatusDidChange', handleChange);
    }
  });

  return isAuthorized;
}

export default useAuthorization;