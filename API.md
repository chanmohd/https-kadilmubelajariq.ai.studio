# API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### 1. Health Check
**GET** `/health`

Check server status and provider information.

**Response:**
```json
{
  "status": "ok",
  "provider": {
    "primary": {
      "name": "Claude (Free)",
      "models": {...},
      "rateLimit": {...}
    },
    "currentModel": "claude-3-5-haiku-20241022",
    "maxTokens": 1000,
    "useFallback": true
  },
  "timestamp": "2026-07-28T04:04:15Z"
}
```

---

### 2. Send Message
**POST** `/api/chat`

Send a message to Claude AI and get a response.

**Request Body:**
```json
{
  "message": "What is machine learning?"
}
```

**Response:**
```json
{
  "success": true,
  "message": "What is machine learning?",
  "response": "Machine learning is a subset of AI...",
  "provider": "Claude Free",
  "timestamp": "2026-07-28T04:04:15Z"
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Message is required"
}
```

---

### 3. Get Providers Info
**GET** `/api/providers`

Get information about available AI providers.

**Response:**
```json
{
  "primary": {
    "name": "Claude (Free)",
    "models": {
      "fast": "claude-3-5-haiku-20241022",
      "standard": "claude-3-haiku-20240307"
    },
    "rateLimit": {
      "tokensPerMinute": 40000,
      "requestsPerMinute": 50
    },
    "cost": "FREE",
    "maxTokens": 1000
  },
  "fallback": {
    "name": "Groq (Free - Alternative)",
    "models": {
      "fast": "mixtral-8x7b-32768"
    },
    "rateLimit": {
      "tokensPerMinute": 30000
    },
    "cost": "FREE"
  },
  "currentModel": "claude-3-5-haiku-20241022",
  "maxTokens": 1000,
  "useFallback": true
}
```

---

## Usage Examples

### Using cURL
```bash
# Check health
curl http://localhost:3000/health

# Send message
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello, what can you do?"}'

# Get providers
curl http://localhost:3000/api/providers
```

### Using JavaScript/Node.js
```javascript
const AIClient = require('./claude-client');
const aiClient = new AIClient();

// Send message
const response = await aiClient.sendMessage('Your question here');
console.log(response);

// Get provider info
console.log(aiClient.getProviderInfo());
```

### Using Python
```python
import requests

url = "http://localhost:3000/api/chat"
data = {"message": "What is AI?"}

response = requests.post(url, json=data)
print(response.json())
```

---

## Rate Limits

- **Claude Free Tier**: 50 requests/minute, 40,000 tokens/minute
- **Groq Free**: 30,000 tokens/minute
- **Response**: Will auto-fallback if primary exceeds limits

---

## Error Handling

| Status | Error | Description |
|--------|-------|-------------|
| 400 | Bad Request | Missing required fields |
| 500 | Server Error | API error or all providers failed |
| 501 | Not Implemented | Feature not yet available |
| 404 | Not Found | Endpoint doesn't exist |

---

## Environment Variables

```env
CLAUDE_API_KEY=your_key_here
GROQ_API_KEY=your_key_here
PORT=3000
MAX_TOKENS=1000
TEMPERATURE=0.7
USE_FALLBACK=true
```

---

## Cost Estimation

- **Claude 3.5 Haiku**: $0.80/1M input, $2.40/1M output
- **Groq (Free)**: $0 (completely free)
- **Estimated Monthly**: $0-5 (vs $50+ with other models)

---

## Support

For issues or questions:
1. Check `.env` configuration
2. Verify API keys are valid
3. Check rate limits
4. Review server logs
