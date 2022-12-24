import { useState, useEffect } from 'react';

export default function useIsMobile(breakpoint: number = 700) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize(): void {
      setIsMobile(window.innerWidth < breakpoint);
    }
    window.addEventListener('resize', handleResize);

    return function () {
      window.removeEventListener('resize', handleResize);
    };
  });
  return isMobile;
}
