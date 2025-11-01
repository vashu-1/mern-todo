'use client';

import Link from 'next/link';
import React from 'react';
import { useLoader } from '../providers/LoaderProvider';

export default function NavLink({ href, children, className, ...props }) {
  const { show } = useLoader();

  const handleClick = (e) => {
    // show loader immediately on click
    try {
      show();
    } catch (err) {
      // ignore if context missing
    }
    // allow normal navigation
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
