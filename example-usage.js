/**
 * Example Usage - Claude Free API
 * Shows how to use the AI client with fallback
 */

require('dotenv').config();
const AIClient = require('./claude-client');

async function main() {
  const aiClient = new AIClient();

  console.log('=== AI Provider Info ===');
  console.log(aiClient.getProviderInfo());
  console.log('\n');

  try {
    // Example 1: Simple message
    console.log('Sending message to Claude...');
    const response1 = await aiClient.sendMessage(
      'Explain machine learning in 50 words or less.'
    );
    console.log('Response:', response1);
    console.log('\n');

    // Example 2: With custom model
    console.log('Sending message with fallback enabled...');
    const response2 = await aiClient.sendMessage(
      'What is the capital of France?',
      { model: 'claude-3-5-haiku-20241022' }
    );
    console.log('Response:', response2);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
