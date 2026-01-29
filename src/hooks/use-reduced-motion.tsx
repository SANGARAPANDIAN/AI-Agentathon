import { useEffect, useState } from 'react';

export const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);

  useEffect(() => {
    // Check user preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setShouldReduceMotion(mediaQuery.matches);

    // Check device performance
    const isLowEndDevice = () => {
      // @ts-ignore
      const memory = (navigator as any).deviceMemory;
      const cores = navigator.hardwareConcurrency || 1;
      
      return memory < 4 || cores < 4;
    };

    if (isLowEndDevice()) {
      setShouldReduceMotion(true);
    }

    const handleChange = () => setShouldReduceMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return shouldReduceMotion;
};
