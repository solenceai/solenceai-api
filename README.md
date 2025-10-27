# Solence API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-purple.svg)](https://solana.com/)
[![API Status](https://img.shields.io/badge/API-Live-success.svg)](https://solence.ai/status)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

> AI-powered security scanner for Solana wallets with deterministic risk scoring.

Solence API provides a simple REST interface for analyzing Solana wallet security. Get comprehensive risk assessments, AI-generated insights, and verifiable on-chain safety badges.

## 🚀 Quick Start

### Make your first API call

```bash
curl -X POST https://solence.ai/api/scan \
  -H "Content-Type: application/json" \
  -d '{"wallet": "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"}'
```

### Response

```json
{
  "score": 82,
  "riskLevel": "LOW",
  "findings": [
    "Wallet age: 247 days (established)",
    "Transaction count: 1,234 (active)",
    "Token diversity: 12 unique tokens"
  ],
  "aiSummary": "This wallet shows healthy activity patterns...",
  "walletDetails": {
    "solBalance": 12.4567,
    "tokenCount": 12,
    "nftCount": 3,
    "txCount": 1234,
    "accountAgeDays": 247
  }
}
```

## 📚 Documentation

- **[API Reference](docs/API.md)** - Complete endpoint documentation
- **[Authentication](docs/AUTH.md)** - API key setup (optional)
- **[Rate Limits](docs/RATE_LIMITS.md)** - Usage tiers and limits
- **[Code Examples](examples/)** - Integration examples in multiple languages
- **[Interactive Playground](https://solence.ai/playground)** - Test the API in your browser

## ✨ Features

- **🔍 Deterministic Scoring** - Same wallet always returns the same score under identical conditions
- **🤖 AI-Powered Insights** - Natural language security recommendations
- **⚡ Fast Response Times** - Sub-second latency for most requests
- **🔓 No Auth Required** - Start testing immediately without API keys
- **🛡️ Rate Limit Friendly** - 10 free scans per hour per IP
- **📊 Comprehensive Data** - Balance, tokens, NFTs, transaction history, and more
- **🎯 On-Chain Badges** - Mint verifiable SPL tokens for wallets that pass threshold

## 🔗 Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/scan` | POST | Scan a wallet and get risk score |
| `/api/scans` | GET | Retrieve past scan history |
| `/api/badge/mint` | POST | Mint a Safety Badge for qualifying wallets |
| `/api/badge/verify` | GET | Check if a wallet has a Safety Badge |

## 💻 Client Libraries

### JavaScript/TypeScript

```typescript
import { SolenceClient } from 'solence-sdk';

const client = new SolenceClient();

const result = await client.scanWallet(
  '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
);

console.log(`Score: ${result.score}, Risk: ${result.riskLevel}`);
```

### Python

```python
from solence import SolenceClient

client = SolenceClient()

result = client.scan_wallet(
    "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
)

print(f"Score: {result.score}, Risk: {result.risk_level}")
```

### cURL

```bash
curl -X POST https://solence.ai/api/scan \
  -H "Content-Type: application/json" \
  -d '{"wallet": "YOUR_WALLET_ADDRESS"}'
```

## 🎯 Use Cases

- **Treasury Management** - Verify multisig wallets before large transfers
- **DAO Governance** - Gate membership based on wallet security scores
- **DeFi Protocols** - Screen users before granting access to high-value operations
- **OTC Trading** - Due diligence on counterparty wallets
- **Airdrop Filtering** - Exclude high-risk wallets from distributions
- **Compliance** - Automated risk assessment for regulatory requirements

## 📊 Scoring Methodology

Our deterministic scoring engine analyzes:

- **Transaction History** (30%) - Volume, frequency, patterns
- **Wallet Age** (20%) - Account longevity and consistency
- **Token Diversity** (15%) - Portfolio distribution
- **Activity Patterns** (15%) - Regularity and behavior indicators
- **Protocol Interactions** (10%) - Engagement with verified dApps
- **Balance Health** (10%) - Asset stability and composition

Scores range from 0-100:
- **75-100**: Low Risk ✅ (eligible for Safety Badge)
- **50-74**: Medium Risk ⚠️
- **0-49**: High Risk ⛔

## 🔐 Rate Limits

| Tier | Requests/Hour | Authentication | Cost |
|------|---------------|----------------|------|
| **Free** | 100 | None required |
| **Holder** | Unlimited | None required|
| **Enterprise** | Custom | API Key + OAuth | Contact us |

## 🛠️ Development

### Prerequisites

- Node.js 18+
- TypeScript 5.0+
- Solana Web3.js
- MongoDB (for scan history)

### Local Setup

```bash
# Clone the repository
git clone https://github.com/solenceai/solence-api.git
cd solence-api

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run development server
npm run dev
```

### Environment Variables

```env
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
MONGODB_URI=mongodb://localhost:27017/solence
OPENAI_API_KEY=your_openai_key_here
RATE_LIMIT_MAX=10
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run with coverage
npm run test:coverage
```

## 📈 Roadmap

- [x] Basic wallet scanning with deterministic scoring
- [x] AI-powered security insights
- [x] On-chain Safety Badge minting
- [x] Rate limiting and caching
- [ ] WebSocket support for real-time updates
- [ ] Historical trend analysis
- [ ] Multi-wallet batch scanning
- [ ] Enhanced AI model with custom training
- [ ] Webhook notifications
- [ ] GraphQL API endpoint

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website**: [solenceai.com](https://solenceai.com)
- **Playground**: [solenceai.com/playground](https://solenceai.com/playground)
- **Documentation**: [solenceai.com/docs](https://solenceai.com/docs)
- **Status Page**: [solenceai.com/status](https://solenceai.com/status)
- **Twitter**: [@SolenceAi](https://twitter.com/SolenceAi)

## 🙏 Acknowledgments

- Built on [Solana](https://solana.com/)
- Powered by [OpenAI](https://openai.com/)
- Infrastructure by [Helius](https://helius.xyz/)

## 📧 Support

- **Email**: support@solenceai.com
- **Issues**: [GitHub Issues](https://github.com/solenceai/solence-api/issues)

---

Made with ❤️ by the Solence team
