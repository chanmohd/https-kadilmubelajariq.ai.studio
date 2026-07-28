/**
 * Response Caching - Reduce API calls
 * Cache responses to minimize token usage and costs
 */

class ResponseCache {
  constructor(ttlMinutes = 60) {
    this.cache = new Map();
    this.ttlMinutes = ttlMinutes;
  }

  /**
   * Generate cache key from message
   */
  generateKey(message) {
    return message.toLowerCase().trim();
  }

  /**
   * Get cached response
   */
  get(message) {
    const key = this.generateKey(message);
    const cached = this.cache.get(key);

    if (!cached) return null;

    // Check if expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    console.log('✅ Cache hit:', key);
    return cached.response;
  }

  /**
   * Set cache
   */
  set(message, response) {
    const key = this.generateKey(message);
    this.cache.set(key, {
      response,
      expiresAt: Date.now() + this.ttlMinutes * 60 * 1000,
      createdAt: new Date(),
    });
    console.log('💾 Cached:', key);
  }

  /**
   * Clear all cache
   */
  clear() {
    console.log('🗑️  Cache cleared');
    this.cache.clear();
  }

  /**
   * Get cache stats
   */
  getStats() {
    return {
      size: this.cache.size,
      items: Array.from(this.cache.entries()).map(([key, value]) => ({
        key,
        createdAt: value.createdAt,
        expiresAt: new Date(value.expiresAt),
      })),
    };
  }
}

module.exports = ResponseCache;
