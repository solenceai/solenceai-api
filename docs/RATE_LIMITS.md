# Rate Limits

Solence API implements rate limiting to ensure fair usage and maintain service quality for all users.

## Overview

Rate limits are applied per IP address for unauthenticated requests and per API key for authenticated requests.

## Tiers

### Free Tier (No Authentication)

Perfect for testing and light usage.

| Metric | Limit |
|--------|-------|
| Requests per hour | 10 |
| Requests per day | 100 |
| Concurrent requests | 2 |
| Endpoints | Read-only |

**Best for:**
- Testing the API
- Personal projects
- Development environments
- Proof of concepts

### Developer Tier (API Key)

For developers building applications.

| Metric | Limit |
|--------|-------|
| Requests per hour | 50 |
| Requests per day | 1,000 |
| Concurrent requests | 5 |
| Endpoints | All except batch operations |
| Cost | **Free** |

**Best for:**
- Side projects
- Small dApps
- Development and staging environments
- MVP applications

**How to get started:**
1. Sign up at [solence.ai](https://solence.ai)
2. Generate an API key in your dashboard
3. Include key in request headers: `X-API-Key: your_key_here`

### Pro Tier (API Key)

For production applications with higher traffic.

| Metric | Limit |
|--------|-------|
| Requests per hour | 500 |
| Requests per day | 10,000 |
| Concurrent requests | 20 |
| Endpoints | All including batch operations |
| WebSocket connections | 5 |
| Cost | **$49/month** |

**Additional features:**
- Priority support via Discord
- 99.9% uptime SLA
- Dedicated rate limit dashboard
- Webhook notifications
- Early access to new features

**Best for:**
- Production dApps
- DAOs
- DeFi protocols
- Trading platforms

### Enterprise Tier (Custom)

Custom limits for large-scale applications.

| Metric | Limit |
|--------|-------|
| Requests per hour | Custom |
| Requests per day | Custom |
| Concurrent requests | Custom |
| Endpoints | All including custom endpoints |
| WebSocket connections | Custom |
| Cost | **Contact us** |

**Additional features:**
- Custom SLA agreements
- Dedicated account manager
- On-premise deployment options
- Custom integrations
- Priority feature development
- Phone support

**Best for:**
- Enterprises
- Exchanges
- Large protocols
- Custom integrations

## Rate Limit Headers

All API responses include rate limit information in headers:

```http
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1641024000
X-RateLimit-Retry-After: 3600
```

| Header | Description |
|--------|-------------|
| `X-RateLimit-Limit` | Maximum requests allowed in current window |
| `X-RateLimit-Remaining` | Requests remaining in current window |
| `X-RateLimit-Reset` | Unix timestamp when the limit resets |
| `X-RateLimit-Retry-After` | Seconds until you can retry (on 429 errors) |

## Rate Limit Errors

When you exceed the rate limit, you'll receive a `429 Too Many Requests` response:

```json
{
  "error": "Rate limit exceeded. Try again in 3600 seconds.",
  "retryAfter": 3600,
  "limit": 10,
  "reset": 1641024000
}
```

## Best Practices

### 1. Implement Exponential Backoff

```typescript
async function scanWithRetry(wallet: string, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await scanWallet(wallet);
    } catch (error) {
      if (error.status === 429 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
}
```

### 2. Cache Results

Cache scan results locally to avoid redundant API calls:

```typescript
const cache = new Map<string, { result: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function getCachedScan(wallet: string) {
  const cached = cache.get(wallet);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result;
  }
  
  const result = await scanWallet(wallet);
  cache.set(wallet, { result, timestamp: Date.now() });
  
  return result;
}
```

### 3. Monitor Rate Limit Headers

Track your usage by monitoring rate limit headers:

```typescript
function handleRateLimitHeaders(response: Response) {
  const remaining = parseInt(response.headers.get('X-RateLimit-Remaining'));
  const reset = parseInt(response.headers.get('X-RateLimit-Reset'));
  
  if (remaining < 3) {
    console.warn(`Low rate limit: ${remaining} requests remaining`);
    console.warn(`Resets at: ${new Date(reset * 1000).toISOString()}`);
  }
}
```

### 4. Batch Operations (Pro/Enterprise)

Use batch endpoints to scan multiple wallets efficiently:

```typescript
// Pro tier and above
const results = await batchScanWallets([
  'wallet1...',
  'wallet2...',
  'wallet3...'
]);
```

### 5. Use WebSockets (Pro/Enterprise)

For real-time updates, use WebSocket connections instead of polling:

```typescript
const ws = new WebSocket('wss://solence.ai/ws');

ws.on('scan.completed', (data) => {
  console.log('Scan completed:', data);
});
```

## Upgrading

### From Free to Developer

No action needed - just generate an API key in your dashboard.

### From Developer to Pro

1. Visit [solence.ai/pricing](https://solence.ai/pricing)
2. Select Pro tier
3. Enter payment details
4. Upgrade is instant

### From Pro to Enterprise

1. Contact sales@solence.ai
2. Schedule a call to discuss requirements
3. Custom contract and SLA
4. Dedicated onboarding

## FAQs

**Q: What happens if I exceed my rate limit?**

A: You'll receive a 429 error with a `Retry-After` header indicating when you can retry.

**Q: Are rate limits per API key or per IP?**

A: Unauthenticated requests are limited per IP. Authenticated requests are limited per API key.

**Q: Can I request a temporary rate limit increase?**

A: Pro and Enterprise customers can request temporary increases by contacting support.

**Q: Do rate limits reset at midnight?**

A: No, rate limits use a sliding window. The hourly limit resets exactly one hour after your first request.

**Q: Are there separate limits for different endpoints?**

A: No, all endpoints share the same rate limit quota. However, some operations (like batch scans) may consume multiple quota units.

**Q: What if I need more than Enterprise tier limits?**

A: Contact us to discuss custom infrastructure solutions, including on-premise deployment.

## Contact

Questions about rate limits?

- **Email**: support@solence.ai
- **Discord**: [Join our community](https://discord.gg/solence)
- **Enterprise**: sales@solence.ai
