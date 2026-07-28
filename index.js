/**
 * Express Server - AI API
 * Provides REST API endpoints for AI interactions
 */

require('dotenv').config();
const express = require('express');
const AIClient = require('./claude-client');

const app = express();
const aiClient = new AIClient();

// Middleware
app.use(express.json());

// Routes

/**
 * GET /health
 * Check server status
 */
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    provider: aiClient.getProviderInfo(),
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/chat
 * Send message to AI
 * Body: { message: string }
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await aiClient.sendMessage(message);

    res.json({
      success: true,
      message: message,
      response: response,
      provider: 'Claude Free',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      provider: aiClient.getProviderInfo(),
    });
  }
});

/**
 * GET /api/providers
 * Get available providers info
 */
app.get('/api/providers', (req, res) => {
  res.json(aiClient.getProviderInfo());
});

/**
 * POST /api/chat/stream
 * Stream response (for future implementation)
 */
app.post('/api/chat/stream', (req, res) => {
  res.status(501).json({
    error: 'Streaming not yet implemented',
    status: 'coming_soon',
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 AI Server running on http://localhost:${PORT}`);
  console.log(`📊 Provider: ${aiClient.getProviderInfo().primary.name}`);
  console.log(`📝 Endpoints:`);
  console.log(`   GET  /health           - Server status`);
  console.log(`   POST /api/chat         - Send message`);
  console.log(`   GET  /api/providers    - Provider info`);
});

module.exports = app;
