'use client';

/**
 * Performance monitoring utilities to track and prevent forced reflows
 */

// Detect forced reflows in development
export const monitorReflows = () => {
  if (process.env.NODE_ENV !== 'development') return;

  // List of properties that trigger reflow when read
  const reflowProperties = [
    'offsetTop', 'offsetLeft', 'offsetWidth', 'offsetHeight',
    'scrollTop', 'scrollLeft', 'scrollWidth', 'scrollHeight',
    'clientTop', 'clientLeft', 'clientWidth', 'clientHeight',
    'getBoundingClientRect', 'getClientRects',
    'innerText', 'outerText'
  ];

  // Track reflow-triggering operations
  let reflowCount = 0;
  const reflowStack = [];

  // Wrap Element prototype methods to detect reflows
  if (typeof window !== 'undefined' && window.Element) {
    reflowProperties.forEach(prop => {
      const original = Element.prototype[prop];
      if (typeof original === 'function') {
        Element.prototype[prop] = function(...args) {
          reflowCount++;
          const stack = new Error().stack;
          reflowStack.push({ property: prop, stack });
          
          if (reflowCount > 10) {
            console.warn(`⚠️ Potential reflow detected: ${prop} called ${reflowCount} times`);
            console.trace();
          }
          
          return original.apply(this, args);
        };
      }
    });
  }

  // Report reflows periodically
  setInterval(() => {
    if (reflowCount > 0) {
      console.log(`📊 Reflows detected: ${reflowCount}`);
      reflowCount = 0;
      reflowStack.length = 0;
    }
  }, 5000);
};

// Measure component render performance
export const measureRenderTime = (componentName) => {
  if (typeof window === 'undefined') return () => {};

  const startMark = `${componentName}-start`;
  const endMark = `${componentName}-end`;
  const measureName = `${componentName}-render`;

  performance.mark(startMark);

  return () => {
    performance.mark(endMark);
    performance.measure(measureName, startMark, endMark);
    
    const measure = performance.getEntriesByName(measureName)[0];
    if (measure && measure.duration > 16.67) { // > 60fps threshold
      console.warn(`⚠️ Slow render: ${componentName} took ${measure.duration.toFixed(2)}ms`);
    }
    
    performance.clearMarks(startMark);
    performance.clearMarks(endMark);
    performance.clearMeasures(measureName);
  };
};

// Batch DOM reads and writes to prevent layout thrashing
export class LayoutBatcher {
  constructor() {
    this.readQueue = [];
    this.writeQueue = [];
    this.scheduled = false;
  }

  // Schedule a DOM read operation
  read(fn) {
    this.readQueue.push(fn);
    this.schedule();
    return this;
  }

  // Schedule a DOM write operation
  write(fn) {
    this.writeQueue.push(fn);
    this.schedule();
    return this;
  }

  // Schedule the batch execution
  schedule() {
    if (this.scheduled) return;
    this.scheduled = true;

    requestAnimationFrame(() => {
      // Execute all reads first (batched)
      const reads = this.readQueue.slice();
      this.readQueue = [];
      
      const readResults = reads.map(fn => fn());

      // Then execute all writes (batched)
      const writes = this.writeQueue.slice();
      this.writeQueue = [];
      
      writes.forEach((fn, i) => fn(readResults[i]));

      this.scheduled = false;
    });
  }

  // Clear all pending operations
  clear() {
    this.readQueue = [];
    this.writeQueue = [];
    this.scheduled = false;
  }
}

// Singleton instance for global use
export const layoutBatcher = new LayoutBatcher();

// Optimize scroll performance
export const optimizeScroll = (element, callback) => {
  if (typeof window === 'undefined') return () => {};

  let ticking = false;
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const scrollDelta = scrollY - lastScrollY;
        
        callback({
          scrollY,
          scrollDelta,
          direction: scrollDelta > 0 ? 'down' : 'up'
        });
        
        lastScrollY = scrollY;
        ticking = false;
      });
      ticking = true;
    }
  };

  const target = element || window;
  target.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    target.removeEventListener('scroll', handleScroll);
  };
};

// Debounce function to reduce reflow frequency
export const debounce = (fn, delay = 150) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

// Throttle function to limit reflow frequency
export const throttle = (fn, limit = 100) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Check if element is in viewport without causing reflow
export const isInViewport = (element) => {
  if (!element || typeof IntersectionObserver === 'undefined') {
    return false;
  }

  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        resolve(entry.isIntersecting);
        observer.disconnect();
      },
      { threshold: 0 }
    );

    observer.observe(element);
  });
};

// Lazy load images without causing reflows
export const lazyLoadImage = (img) => {
  if (!img || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.add('loaded');
          observer.unobserve(lazyImage);
        }
      });
    },
    {
      rootMargin: '50px', // Load images 50px before they enter viewport
    }
  );

  observer.observe(img);
};

// Performance metrics reporter
export const reportWebVitals = (metric) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
    });
  }

  // Send to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    // window.gtag?.('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   metric_id: metric.id,
    //   metric_value: metric.value,
    //   metric_delta: metric.delta,
    // });
  }
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (typeof window === 'undefined') return;

  // Monitor reflows in development
  if (process.env.NODE_ENV === 'development') {
    monitorReflows();
  }

  // Track Long Tasks (tasks that block the main thread)
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
          }
        }
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Long task API not supported
    }

    // Track layout shifts
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput && entry.value > 0.1) {
            console.warn(`⚠️ Layout shift detected: ${entry.value.toFixed(4)}`);
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Layout shift API not supported
    }
  }

  console.log('✅ Performance monitoring initialized');
};
