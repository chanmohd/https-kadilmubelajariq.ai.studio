#!/bin/bash

# Installation script for Kadil Mubelajariq AI Studio

echo "╔════════════════════════════════════════╗"
echo "║  Kadil Mubelajariq AI Studio Setup     ║"
echo "║  Claude Free + Groq Fallback           ║"
echo "╚════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "✅ Dependencies installed!"
echo ""

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "🔧 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env and add your API keys:"
    echo "   - CLAUDE_API_KEY (from https://console.anthropic.com)"
    echo "   - GROQ_API_KEY (from https://console.groq.com)"
else
    echo "✅ .env file already exists"
fi

echo ""
echo "╔════════════════════════════════════════╗"
echo "║  Setup Complete!                       ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo "1. Edit .env and add your API keys"
echo "2. Run: npm start          (Start server)"
echo "3. Run: npm test           (Test example)"
echo "4. Run: node cli.js        (Interactive CLI)"
echo ""
echo "📚 Documentation:"
echo "   - README.md  - Overview and setup"
echo "   - API.md     - API endpoints"
echo ""
