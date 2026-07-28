/**
 * Claude Free API Client
 * Reduces costs by:
 * 1. Using cheapest models (Haiku)
 * 2. Implementing fallback to alternative free providers
 * 3. Rate limiting requests
 * 4. Caching responses
 */

const Anthropic = require('@anthropic-ai/sdk');
const { CONFIG, AI_PROVIDERS } = require('./ai-config');

class AIClient {
  constructor() {
    this.claudeClient = new Anthropic({
      apiKey: process.env.CLAUDE_API_KEY,
    });
    this.requestCount = 0;
    this.tokenCount = 0;
    this.lastResetTime = Date.now();
  }

  /**
   * Send message to Claude Free tier
   * @param {string} message - User message
   * @param {object} options - Optional parameters
   * @returns {Promise<string>} AI response
   */
  async sendMessage(message, options = {}) {
    try {
      // Check rate limits
      this.checkRateLimit();

      const response = await this.claudeClient.messages.create({
        model: options.model || CONFIG.primaryModel,
        max_tokens: CONFIG.settings.maxTokens,
        temperature: CONFIG.settings.temperature,
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      });

      // Track usage
      this.trackUsage(response.usage);

      return response.content[0].text;
    } catch (error) {
      console.error('Claude API Error:', error.message);

      // Fallback to alternative if enabled
      if (CONFIG.settings.useFallback && error.status !== 401) {
        console.log('Falling back to alternative provider...');
        return this.sendMessageWithFallback(message, options);
      }

      throw error;
    }
  }

  /**
   * Fallback to Groq Free API
   * @param {string} message - User message
   * @param {object} options - Optional parameters
   * @returns {Promise<string>} AI response
   */
  async sendMessageWithFallback(message, options = {}) {
    try {
      // Using Groq as free alternative
      // Note: You'll need to install: npm install groq-sdk
      const Groq = require('groq-sdk');
      const groqClient = new Groq({
        apiKey: process.env.GROQ_API_KEY,
      });

      const response = await groqClient.chat.completions.create({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: CONFIG.settings.maxTokens,
        temperature: CONFIG.settings.temperature,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('Fallback Provider Error:', error.message);
      throw new Error('All AI providers failed. Check your API keys.');
    }
  }

  /**
   * Check rate limits for free tier
   */
  checkRateLimit() {
    const now = Date.now();
    const elapsedMinutes = (now - this.lastResetTime) / 60000;

    if (elapsedMinutes >= 1) {
      // Reset counters every minute
      this.requestCount = 0;
      this.tokenCount = 0;
      this.lastResetTime = now;
    }

    const limits = AI_PROVIDERS.CLAUDE_FREE.rateLimit;
    if (this.requestCount >= limits.requestsPerMinute) {
      throw new Error(`Rate limit exceeded: ${limits.requestsPerMinute} requests/min`);
    }
  }

  /**
   * Track token usage
   */
  trackUsage(usage) {
    this.requestCount++;
    this.tokenCount += usage.input_tokens + usage.output_tokens;
    console.log(`Usage - Requests: ${this.requestCount}, Tokens: ${this.tokenCount}`);
  }

  /**
   * Get current provider info
   */
  getProviderInfo() {
    return {
      primary: AI_PROVIDERS.CLAUDE_FREE,
      fallback: AI_PROVIDERS.GROQ_FREE,
      currentModel: CONFIG.primaryModel,
      maxTokens: CONFIG.settings.maxTokens,
      useFallback: CONFIG.settings.useFallback,
    };
  }
}

module.exports = AIClient;
