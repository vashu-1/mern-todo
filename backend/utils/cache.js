// Simple in-memory cache for API responses
class ApiCache {
  constructor() {
    this.cache = new Map();
    this.ttl = 60000; // 60 seconds default TTL
  }

  // Get cached value
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Check if expired
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  // Set cached value with optional TTL
  set(key, value, ttl = this.ttl) {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl,
    });
  }

  // Clear specific key
  delete(key) {
    this.cache.delete(key);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
  }

  // Clear expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

// Singleton instance
const apiCache = new ApiCache();

// Cleanup expired cache every 5 minutes
setInterval(() => apiCache.cleanup(), 5 * 60 * 1000);

export default apiCache;

// Middleware to cache GET requests
export const cacheMiddleware = (duration = 60000) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method !== 'GET') {
      return next();
    }

    const key = `__cache__${req.originalUrl || req.url}`;
    const cachedResponse = apiCache.get(key);

    if (cachedResponse) {
      res.set('X-Cache', 'HIT');
      return res.json(cachedResponse);
    }

    // Store original res.json
    const originalJson = res.json.bind(res);

    // Override res.json
    res.json = (data) => {
      // Cache successful responses only
      if (res.statusCode === 200) {
        apiCache.set(key, data, duration);
      }
      res.set('X-Cache', 'MISS');
      return originalJson(data);
    };

    next();
  };
};
