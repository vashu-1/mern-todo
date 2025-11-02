# Performance Optimizations

This document outlines the performance optimizations implemented to reduce forced reflows and improve application performance.

## 🎯 Problem: Forced Reflows

A forced reflow (also called layout thrashing) occurs when JavaScript reads layout properties (like `offsetWidth`, `getBoundingClientRect`) after modifying the DOM. This causes the browser to recalculate the entire layout synchronously, blocking the main thread and degrading performance.

## ✅ Solutions Implemented

### 1. Next.js Configuration (`next.config.mjs`)

- **SWC Minification**: Faster builds and smaller bundles
- **Package Import Optimization**: Tree-shaking for `framer-motion`, `@tabler/icons-react`, and `react-icons`
- **Webpack Optimization**: Filesystem caching for faster rebuilds
- **Framer Motion ES Module**: Uses optimized build to reduce bundle size

### 2. Optimized Motion Components (`app/components/OptimizedMotion.js`)

- **GPU-Accelerated Animations**: Uses only `transform` and `opacity` properties
- **Will-Change Hints**: Tells browser which properties will animate
- **Memoized Variants**: Prevents recreation on each render
- **Viewport Intersection**: Lazy-loads animations only when elements are visible

**Usage:**
```javascript
import { OptimizedMotionDiv, OptimizedViewportMotion } from '@/app/components/OptimizedMotion';

// Simple fade-in animation
<OptimizedMotionDiv variant="fadeInUp" delay={0.2}>
  <YourContent />
</OptimizedMotionDiv>

// Viewport-triggered animation
<OptimizedViewportMotion variant="fadeInScale">
  <YourCard />
</OptimizedViewportMotion>
```

### 3. Performance Hooks (`app/hooks/usePerformance.js`)

Custom React hooks to prevent layout thrashing:

- **`useDebounce`**: Debounces resize/input events
- **`useThrottle`**: Throttles scroll events
- **`useRAF`**: Batches DOM operations using requestAnimationFrame
- **`useOptimizedScroll`**: Passive scroll listener with throttling
- **`useOptimizedResize`**: Passive resize listener with debouncing
- **`useBatchedLayout`**: Batches DOM reads and writes to prevent thrashing

**Usage:**
```javascript
import { useOptimizedScroll, useBatchedLayout } from '@/app/hooks/usePerformance';

// Optimized scroll handler
useOptimizedScroll(() => {
  // Your scroll logic
}, { throttleMs: 100 });

// Batch layout operations
const { scheduleRead, scheduleWrite } = useBatchedLayout();

scheduleRead(() => {
  const height = element.offsetHeight; // Read
  scheduleWrite(() => {
    element.style.height = height + 'px'; // Write
  });
});
```

### 4. Performance CSS (`app/styles/performance.css`)

CSS-based optimizations to reduce reflows:

- **GPU Acceleration**: `.gpu-accelerated` class for transform-based animations
- **CSS Containment**: `.performance-optimized` isolates repaints
- **Optimized Transitions**: Only animates `transform` and `opacity`
- **Scroll Optimizations**: Hardware-accelerated scrolling
- **Layout Containment**: Prevents child elements from affecting parent layout

**Usage:**
```jsx
<div className="gpu-accelerated hover-optimized">
  <YourAnimatedContent />
</div>

<div className="scroll-container">
  <YourLongList />
</div>
```

### 5. Performance Utilities (`app/utils/performance.js`)

Advanced performance monitoring and optimization tools:

- **Layout Batcher**: Batches DOM reads/writes to prevent thrashing
- **Reflow Monitor**: Detects and logs forced reflows in development
- **Performance Metrics**: Tracks render times and long tasks
- **Optimized Scroll**: RAF-based scroll handler
- **Lazy Loading**: Intersection Observer-based image loading

**Usage:**
```javascript
import { layoutBatcher, initPerformanceMonitoring } from '@/app/utils/performance';

// Initialize monitoring (call once in your app)
initPerformanceMonitoring();

// Batch DOM operations
layoutBatcher
  .read(() => element.offsetHeight)
  .write((height) => element.style.height = height + 'px');

// Optimize scroll
const cleanup = optimizeScroll(window, ({ scrollY, direction }) => {
  // Your scroll logic
});
```

## 📊 Performance Improvements

### Before Optimization:
- Forced reflows: **55ms+** total
- Multiple layout thrashing events per interaction
- Janky animations and scrolling

### After Optimization:
- GPU-accelerated animations (no layout calculations)
- Batched DOM operations (single reflow per frame)
- Passive event listeners (non-blocking)
- Debounced/throttled handlers (reduced frequency)

## 🚀 Best Practices

### DO ✅
1. Use `transform` and `opacity` for animations
2. Batch DOM reads, then batch DOM writes
3. Use `requestAnimationFrame` for visual updates
4. Add `will-change` for known animations
5. Use CSS `contain` to isolate layout changes
6. Use passive event listeners for scroll/touch
7. Debounce resize handlers, throttle scroll handlers

### DON'T ❌
1. Don't read layout properties after DOM modifications
2. Don't animate properties like `width`, `height`, `top`, `left`
3. Don't use synchronous layout reads in loops
4. Don't trigger reflows inside event handlers
5. Don't forget to remove `will-change` after animations

## 🔧 Usage in Your Components

### Example: Optimized Card Component

```javascript
import { OptimizedViewportMotion } from '@/app/components/OptimizedMotion';

export const Card = ({ title, content }) => {
  return (
    <OptimizedViewportMotion 
      variant="fadeInUp"
      className="card-optimized hover-optimized"
    >
      <h3>{title}</h3>
      <p>{content}</p>
    </OptimizedViewportMotion>
  );
};
```

### Example: Optimized List Rendering

```javascript
import { useOptimizedScroll } from '@/app/hooks/usePerformance';

export const TodoList = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(20);

  useOptimizedScroll(() => {
    // Load more items when scrolling
    if (visibleCount < items.length) {
      setVisibleCount(prev => prev + 20);
    }
  }, { throttleMs: 200 });

  return (
    <div className="scroll-container list-optimized">
      {items.slice(0, visibleCount).map((item, i) => (
        <TodoCard key={item.id} {...item} />
      ))}
    </div>
  );
};
```

## 📈 Monitoring Performance

In development mode, the app automatically logs:
- Forced reflows
- Long tasks (>50ms)
- Layout shifts
- Slow component renders (>16.67ms)

Check your browser console for warnings like:
```
⚠️ Potential reflow detected: offsetWidth called 15 times
⚠️ Long task detected: 120.50ms
⚠️ Slow render: HomePage took 25.30ms
```

## 🔍 Debugging

To identify performance issues:

1. Open Chrome DevTools Performance tab
2. Start recording
3. Interact with your app
4. Stop recording
5. Look for:
   - Long tasks (red triangles)
   - Layout/Reflow events (purple bars)
   - Paint events (green bars)

## 📚 Resources

- [Avoid Large, Complex Layouts](https://web.dev/avoid-large-complex-layouts-and-layout-thrashing/)
- [Optimize JavaScript Execution](https://web.dev/optimize-javascript-execution/)
- [Framer Motion Performance](https://www.framer.com/motion/guide-reduce-bundle-size/)
- [CSS Containment](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Containment)

## 🎯 Next Steps

1. Replace `motion` components with `OptimizedMotionDiv` in high-traffic pages
2. Add performance monitoring to production (optional)
3. Use Chrome DevTools to identify remaining bottlenecks
4. Consider code-splitting for large pages
5. Implement virtual scrolling for very long lists

---

**Note**: These optimizations are already applied to the codebase. Simply use the provided components and hooks instead of raw Framer Motion or native DOM operations.
