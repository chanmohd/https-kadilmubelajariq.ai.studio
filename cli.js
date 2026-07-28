/**
 * Interactive CLI - Claude Free API
 * Command-line interface for testing AI responses
 */

require('dotenv').config();
const readline = require('readline');
const AIClient = require('./claude-client');

const aiClient = new AIClient();

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion() {
  rl.question('\n💬 You: ', async (input) => {
    if (input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      console.log('\n👋 Goodbye!');
      rl.close();
      return;
    }

    if (input.toLowerCase() === 'info') {
      const info = aiClient.getProviderInfo();
      console.log('\n📊 Provider Info:');
      console.log(JSON.stringify(info, null, 2));
      askQuestion();
      return;
    }

    if (input.toLowerCase() === 'help') {
      showHelp();
      askQuestion();
      return;
    }

    if (!input.trim()) {
      askQuestion();
      return;
    }

    try {
      console.log('\n⏳ Waiting for response...');
      const response = await aiClient.sendMessage(input);
      console.log('\n🤖 Claude:', response);
    } catch (error) {
      console.error('\n❌ Error:', error.message);
    }

    askQuestion();
  });
}

function showHelp() {
  console.log(`
╔════════════════════════════════════════╗
║     Claude Free API CLI - Help         ║
╚════════════════════════════════════════╝

Commands:
  exit      - Exit the program
  quit      - Exit the program
  info      - Show provider information
  help      - Show this help message

Just type your question and press Enter!

Example:
  💬 You: What is AI?
  🤖 Claude: AI (Artificial Intelligence)...
  `);
}

// Start CLI
console.log(`
╔════════════════════════════════════════╗
║   Kadil Mubelajariq AI Studio CLI      ║
║     Claude Free + Groq Fallback        ║
╚════════════════════════════════════════╝

Provider: ${aiClient.getProviderInfo().primary.name}
Model: ${aiClient.getProviderInfo().currentModel}

Type 'help' for commands or 'exit' to quit
`);

askQuestion();
