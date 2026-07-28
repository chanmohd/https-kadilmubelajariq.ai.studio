/**
 * AI Configuration - Free Model Switching
 * Purpose: Reduce costs by using Claude Free tier with fallback options
 */

const AI_PROVIDERS = {
  CLAUDE_FREE: {
    name: 'Claude (Free)',
    models: {
      fast: 'claude-3-5-haiku-20241022',      // Fastest & cheapest
      standard: 'claude-3-haiku-20240307',    // Fallback option
    },
    rateLimit: {
      tokensPerMinute: 40000,                 // Free tier limit
      requestsPerMinute: 50,
    },
    cost: 'FREE',
    maxTokens: 1000,                          // Keep responses short
  },
  GROQ_FREE: {
    name: 'Groq (Free - Alternative)',
    models: {
      fast: 'mixtral-8x7b-32768',             // Alternative free option
    },
    rateLimit: {
      tokensPerMinute: 30000,
    },
    cost: 'FREE',
  }
};

const CONFIG = {
  primaryProvider: 'CLAUDE_FREE',
  primaryModel: AI_PROVIDERS.CLAUDE_FREE.models.fast,
  fallbackProvider: 'GROQ_FREE',
  fallbackModel: AI_PROVIDERS.GROQ_FREE.models.fast,
  
  settings: {
    maxTokens: parseInt(process.env.MAX_TOKENS || 1000),
    temperature: parseFloat(process.env.TEMPERATURE || 0.7),
    useFallback: process.env.USE_FALLBACK === 'true',
  }
};

module.exports = {
  AI_PROVIDERS,
  CONFIG
};
