'use client';

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { usePathname } from 'next/navigation';
import { BoltLoaderComponent } from '../components/BoltLoader';

const LoaderContext = createContext({
  show: () => {},
  hide: () => {},
  loading: false,
});

export const useLoader = () => useContext(LoaderContext);

export default function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  // Hide loader when pathname changes (navigation finished)
  useEffect(() => {
    if (loading) {
      // small delay to allow the new page to begin rendering
      const t = setTimeout(() => setLoading(false), 300);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const show = useCallback(() => setLoading(true), []);
  const hide = useCallback(() => setLoading(false), []);

  return (
    <LoaderContext.Provider value={{ show, hide, loading }}>
      {children}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <BoltLoaderComponent className="!w-24 !h-24" />
        </div>
      )}
    </LoaderContext.Provider>
  );
}
