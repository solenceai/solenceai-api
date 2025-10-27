# API Reference

Complete documentation for the Solence API.

## Base URL

```
https://solence.ai/api
```

## Authentication

Most endpoints do not require authentication. For endpoints that do, include your API key in the header:

```
X-API-Key: your_api_key_here
```

## Rate Limits

| Tier | Limit | Authentication |
|------|-------|----------------|
| Free | 10/hour | None |
| Developer | 50/hour | API Key |
| Pro | 500/hour | API Key |
| Enterprise | Custom | API Key |

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 10
X-RateLimit-Remaining: 7
X-RateLimit-Reset: 1641024000
```

---

## Endpoints

### POST /api/scan

Scan a Solana wallet and return risk assessment.

**Request**

```http
POST /api/scan HTTP/1.1
Content-Type: application/json

{
  "wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
}
```

**Parameters**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| wallet | string | Yes | Base58 encoded Solana wallet address (32-44 chars) |
| isPublic | boolean | No | Opt-in to publish anonymized scan results (default: false) |

**Response (200 OK)**

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "score": 82,
  "riskLevel": "LOW",
  "findings": [
    "Wallet age: 247 days (established)",
    "Transaction count: 1,234 (active)",
    "Token diversity: 12 unique tokens",
    "Regular activity pattern detected",
    "Interactions with verified protocols"
  ],
  "aiSummary": "This wallet demonstrates healthy security practices with consistent activity over 8 months. The portfolio shows good diversification across 12 tokens with regular transactions. No red flags detected.",
  "walletDetails": {
    "solBalance": 12.4567,
    "tokenCount": 12,
    "nftCount": 3,
    "txCount": 1234,
    "accountAgeDays": 247,
    "lastActivity": "2025-01-15T10:30:00.000Z",
    "firstActivity": "2024-05-12T08:15:00.000Z"
  },
  "createdAt": "2025-01-15T10:30:00.000Z",
  "meta": {
    "createdByWallet": null,
    "isPublic": false
  }
}
```

**Response Codes**

| Code | Description |
|------|-------------|
| 200 | Success |
| 400 | Invalid wallet address format |
| 429 | Rate limit exceeded |
| 500 | Server error |

**Example Requests**

<details>
<summary>cURL</summary>

```bash
curl -X POST https://solence.ai/api/scan \
  -H "Content-Type: application/json" \
  -d '{
    "wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
  }'
```
</details>

<details>
<summary>JavaScript/TypeScript</summary>

```typescript
const response = await fetch('https://solence.ai/api/scan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    wallet: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
  })
});

const data = await response.json();
console.log(`Score: ${data.score}, Risk: ${data.riskLevel}`);
```
</details>

<details>
<summary>Python</summary>

```python
import requests

response = requests.post(
    'https://solence.ai/api/scan',
    json={'wallet': '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'}
)

data = response.json()
print(f"Score: {data['score']}, Risk: {data['riskLevel']}")
```
</details>

---

### GET /api/scans

Retrieve scan history for a wallet.

**Request**

```http
GET /api/scans?wallet=7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU&limit=10 HTTP/1.1
```

**Query Parameters**

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| wallet | string | Yes | - | Wallet address to query |
| limit | number | No | 10 | Number of results (max 50) |
| skip | number | No | 0 | Number of results to skip (pagination) |

**Response (200 OK)**

```json
{
  "wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "total": 5,
  "scans": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "score": 82,
      "riskLevel": "LOW",
      "createdAt": "2025-01-15T10:30:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "score": 78,
      "riskLevel": "LOW",
      "createdAt": "2025-01-10T14:20:00.000Z"
    }
  ]
}
```

---

### POST /api/badge/mint

Mint a Safety Badge NFT for a wallet that passes the security threshold.

**Authentication Required**: Yes

**Request**

```http
POST /api/badge/mint HTTP/1.1
Content-Type: application/json
X-API-Key: your_api_key

{
  "wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "scanId": "507f1f77bcf86cd799439011"
}
```

**Requirements**

- Wallet must have a score ≥ 75
- One badge per wallet (immutable)
- User must sign transaction

**Response (200 OK)**

```json
{
  "success": true,
  "signature": "5J7Xk...",
  "mintAddress": "BdZj4...",
  "explorerUrl": "https://solscan.io/tx/5J7Xk..."
}
```

**Response Codes**

| Code | Description |
|------|-------------|
| 200 | Badge minted successfully |
| 400 | Wallet does not meet requirements (score < 75) |
| 401 | Authentication required |
| 409 | Badge already exists for this wallet |
| 500 | Minting failed |

---

### GET /api/badge/verify

Check if a wallet has a valid Safety Badge.

**Request**

```http
GET /api/badge/verify?wallet=7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU HTTP/1.1
```

**Response (200 OK)**

```json
{
  "wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
  "hasBadge": true,
  "mintAddress": "BdZj4...",
  "mintedAt": "2025-01-15T11:00:00.000Z",
  "score": 82
}
```

---

## Data Models

### ScanResult

```typescript
interface ScanResult {
  _id: string;                    // MongoDB ObjectId
  wallet: string;                 // Base58 wallet address
  score: number;                  // Risk score 0-100
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  findings: string[];             // Array of findings
  aiSummary: string;              // AI-generated insights
  walletDetails: WalletDetails;
  createdAt: string;              // ISO 8601 timestamp
  meta: {
    createdByWallet: string | null;
    isPublic: boolean;
  };
}
```

### WalletDetails

```typescript
interface WalletDetails {
  solBalance: number | null;       // SOL balance
  tokenCount: number | null;       // Number of unique tokens
  nftCount: number | null;         // Number of NFTs
  txCount: number | null;          // Transaction count
  accountAgeDays: number | null;   // Account age in days
  lastActivity: string | null;     // ISO 8601 timestamp
  firstActivity: string | null;    // ISO 8601 timestamp
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message description"
}
```

### Common Errors

**400 Bad Request**
```json
{
  "error": "Invalid wallet address format"
}
```

**429 Too Many Requests**
```json
{
  "error": "Rate limit exceeded. Try again in 3600 seconds."
}
```

**500 Internal Server Error**
```json
{
  "error": "An unexpected error occurred. Please try again."
}
```

---

## Webhooks (Coming Soon)

Register webhook endpoints to receive real-time notifications:

- `scan.completed` - When a scan finishes
- `badge.minted` - When a badge is minted
- `wallet.flagged` - When a high-risk wallet is detected

---

## Support

- **Documentation**: https://solence.ai/docs
- **Playground**: https://solence.ai/playground
- **Discord**: https://discord.gg/solence
- **Email**: api@solence.ai
