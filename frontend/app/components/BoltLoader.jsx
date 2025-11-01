'use client';

import { useEffect, useState } from 'react';
import { BoltLoader } from 'react-awesome-loaders';

// BoltLoader that reads theme colors from CSS variables (works with the project's HSL variables)
export const BoltLoaderComponent = ({ className }) => {
  const [boltColor, setBoltColor] = useState('#6366F1');
  const [bgBlur, setBgBlur] = useState('#E0E7FF');

  useEffect(() => {
    try {
      const root = getComputedStyle(document.documentElement);
      const primary = root.getPropertyValue('--primary').trim();
      const background = root.getPropertyValue('--background').trim();

      // The project's CSS variables are HSL channels like: "0 0% 9%"
      // Convert to usable hsl(...) strings when available
      if (primary) setBoltColor(`hsl(${primary})`);
      if (background) setBgBlur(`hsl(${background})`);
    } catch (e) {
      // ignore and use defaults
    }
  }, []);

  return (
    <BoltLoader
      className={className || 'loaderbolt'}
      boltColor={boltColor}
      backgroundBlurColor={bgBlur}
    />
  );
};
