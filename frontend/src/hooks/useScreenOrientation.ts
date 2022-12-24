import { useState, useEffect } from 'react';

function getOrientation() {
  return window?.screen?.orientation?.type;
}

function useScreenOrientation() {
  const [orientation, setOrientation] = useState(getOrientation());

  useEffect(() => {
    function handleOrientationChange() {
      setOrientation(getOrientation());
    }

    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return orientation;
}

export default useScreenOrientation;
