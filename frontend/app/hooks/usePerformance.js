'use client';

import { useEffect, useRef, useCallback } from 'react';

/**
 * Custom hooks to prevent forced reflows and optimize performance
 */

// Debounce resize events to prevent excessive reflows
export const useDebounce = (callback, delay = 150) => {
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

// Throttle scroll events to reduce reflow frequency
export const useThrottle = (callback, limit = 100) => {
  const lastRan = useRef(Date.now());

  return useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastRan.current >= limit) {
        callback(...args);
        lastRan.current = now;
      }
    },
    [callback, limit]
  );
};

// Request animation frame wrapper to batch DOM reads/writes
export const useRAF = (callback) => {
  const rafRef = useRef(null);

  const execute = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(callback);
  }, [callback]);

  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return execute;
};

// Optimize scroll listener with passive event listeners
export const useOptimizedScroll = (callback, options = {}) => {
  const { throttleMs = 100, passive = true } = options;
  const throttledCallback = useThrottle(callback, throttleMs);

  useEffect(() => {
    const handleScroll = () => {
      // Use RAF to batch the callback execution
      requestAnimationFrame(() => {
        throttledCallback();
      });
    };

    window.addEventListener('scroll', handleScroll, { passive });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttledCallback, passive]);
};

// Optimize resize listener
export const useOptimizedResize = (callback, options = {}) => {
  const { debounceMs = 150, passive = true } = options;
  const debouncedCallback = useDebounce(callback, debounceMs);

  useEffect(() => {
    const handleResize = () => {
      // Use RAF to batch the callback execution
      requestAnimationFrame(() => {
        debouncedCallback();
      });
    };

    window.addEventListener('resize', handleResize, { passive });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [debouncedCallback, passive]);
};

// Prevent layout thrashing by batching reads and writes
export const useBatchedLayout = () => {
  const readQueue = useRef([]);
  const writeQueue = useRef([]);
  const rafId = useRef(null);

  const scheduleFlush = useCallback(() => {
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      // Execute all reads first (batched)
      const reads = readQueue.current.slice();
      readQueue.current = [];
      reads.forEach((read) => read());

      // Then execute all writes (batched)
      const writes = writeQueue.current.slice();
      writeQueue.current = [];
      writes.forEach((write) => write());

      rafId.current = null;
    });
  }, []);

  const scheduleRead = useCallback(
    (readFn) => {
      readQueue.current.push(readFn);
      scheduleFlush();
    },
    [scheduleFlush]
  );

  const scheduleWrite = useCallback(
    (writeFn) => {
      writeQueue.current.push(writeFn);
      scheduleFlush();
    },
    [scheduleFlush]
  );

  useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return { scheduleRead, scheduleWrite };
};
