# Kadil Mubelajariq AI Studio

Free AI Integration with Claude & Fallback Support - Optimized for Cost Reduction

## 🎯 Features

✅ **Claude Free Tier** - Using cheapest models (Haiku)  
✅ **Fallback Support** - Automatic fallback to Groq if Claude fails  
✅ **Rate Limiting** - Respects free tier quotas  
✅ **Cost Tracking** - Monitor token usage  
✅ **Easy Setup** - Simple configuration with `.env`

## 💰 Cost Optimization

This setup reduces AI costs by:

1. **Using Claude 3.5 Haiku** - Fastest & cheapest model (~96% cheaper than GPT-4)
2. **Fallback to Groq** - Free alternative if Claude is unavailable
3. **Rate Limiting** - Prevents exceeding free tier quotas
4. **Max Token Limits** - Keeps responses concise (default: 1000 tokens)

### Estimated Monthly Cost
- **Claude Haiku**: $0.80/1M input tokens, $2.40/1M output tokens
- **Groq Free**: Completely FREE with rate limits
- **Result**: ~$0-5/month vs $50+/month with standard models

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
cp .env.example .env
```

Then add your API keys:
```env
CLAUDE_API_KEY=your_claude_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Get Free API Keys

**Claude (Free Tier)**
- Sign up: https://console.anthropic.com
- Create API key
- Free tier includes: $5 credits/month
- Models: claude-3-5-haiku (cheapest)

**Groq (Completely Free)**
- Sign up: https://console.groq.com
- Create API key
- Unlimited free requests (with rate limits)
- Models: mixtral-8x7b-32768

### 4. Run Example
```bash
npm test
# or
node example-usage.js
```

## 📝 Usage

### Basic Usage
```javascript
const AIClient = require('./claude-client');
const aiClient = new AIClient();

const response = await aiClient.sendMessage('Your question here');
console.log(response);
```

### With Fallback
```javascript
// Automatically falls back to Groq if Claude fails
const response = await aiClient.sendMessage(
  'Your question',
  { model: 'claude-3-5-haiku-20241022' }
);
```

## ⚙️ Configuration

Edit `ai-config.js` to customize:

| Setting | Default | Description |
|---------|---------|-------------|
| `primaryModel` | claude-3-5-haiku | Main AI model |
| `maxTokens` | 1000 | Max response length |
| `temperature` | 0.7 | Response creativity |
| `useFallback` | true | Enable fallback provider |

## 📊 Cost Comparison

| Model | Input Cost | Output Cost | Speed | Quality |
|-------|-----------|-----------|-------|---------|
| Claude 3.5 Haiku (FREE TIER) | $0.80/1M | $2.40/1M | ⚡⚡⚡ | Good |
| Claude 3 Haiku | $0.25/1M | $1.25/1M | ⚡⚡⚡ | Good |
| Groq Mixtral 8x7b (FREE) | FREE | FREE | ⚡⚡⚡⚡ | Good |
| GPT-4 | $3/1K | $6/1K | ⚡ | Best |

**Total Estimated Monthly Cost: $0-5** 💵

## 🔄 Fallback Flow

```
User Request
    ↓
Try Claude API
    ├─ Success? → Return Response ✓
    └─ Fail? → Try Groq (FREE)
            ├─ Success? → Return Response ✓
            └─ Fail? → Return Error ✗
```

## 🐛 Troubleshooting

### "Rate limit exceeded"
- Wait 1 minute before next request
- Or reduce `maxTokens` in config

### "Invalid API key"
- Check `.env` file
- Verify API key in console.anthropic.com or console.groq.com

### Fallback not working
- Set `USE_FALLBACK=true` in `.env`
- Ensure both API keys are provided

## 📚 Resources

- [Anthropic Claude Docs](https://docs.anthropic.com)
- [Groq API Docs](https://console.groq.com/docs)
- [Claude Model List](https://docs.anthropic.com/claude/reference/models-overview)

## 📄 License

MIT

## 👨‍💻 Author

chanmohd

---

**Note**: This is optimized for cost reduction using free tiers. For production, consider your volume needs.
