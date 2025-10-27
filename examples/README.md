# Solence API Examples

This directory contains example implementations in various programming languages to help you get started with the Solence API.

## 📂 Structure

```
examples/
├── javascript/
│   ├── scan-wallet.js      # Basic JavaScript example
│   └── scan-wallet.ts      # TypeScript with full types
├── python/
│   └── scan_wallet.py      # Python implementation
└── rust/
    └── (coming soon)
```

## 🚀 Quick Start

### JavaScript/Node.js

```bash
cd examples/javascript
node scan-wallet.js
```

**With your own wallet:**
```javascript
const { scanWallet } = require('./scan-wallet');

scanWallet('YOUR_WALLET_ADDRESS')
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

### TypeScript

```bash
cd examples/javascript
npx ts-node scan-wallet.ts
```

**In your project:**
```typescript
import { SolenceClient } from './scan-wallet';

const client = new SolenceClient();
const result = await client.scanWallet('YOUR_WALLET_ADDRESS');
```

### Python

```bash
cd examples/python
pip install requests
python scan_wallet.py
```

**In your script:**
```python
from scan_wallet import SolenceClient

client = SolenceClient()
result = client.scan_wallet('YOUR_WALLET_ADDRESS')
print(result)
```

## 🔑 Authentication (Optional)

For higher rate limits, use an API key:

```javascript
// JavaScript
const client = new SolenceClient({ apiKey: 'your_api_key' });
```

```python
# Python
client = SolenceClient(api_key='your_api_key')
```

Get your API key at [solence.ai/dashboard](https://solence.ai/dashboard)

## 📚 Features Demonstrated

All examples show:
- ✅ Basic wallet scanning
- ✅ Error handling
- ✅ Rate limit awareness
- ✅ Safety Badge verification
- ✅ Scan history retrieval
- ✅ Type-safe implementations (TypeScript)

## 🛠️ Requirements

### JavaScript/TypeScript
- Node.js 18+
- npm or yarn

### Python
- Python 3.8+
- requests library

## 💡 Tips

1. **Cache results** to avoid hitting rate limits
2. **Implement retry logic** for 429 errors
3. **Check rate limit headers** to monitor usage
4. **Use TypeScript** for better type safety
5. **Store API keys** in environment variables

## 🔗 Resources

- [Full API Documentation](../docs/API.md)
- [Rate Limits](../docs/RATE_LIMITS.md)
- [Interactive Playground](https://solence.ai/playground)
- [API Reference](https://solence.ai/docs)

## 🤝 Contributing

Found a bug or want to add an example in another language?

1. Fork the repository
2. Create your feature branch
3. Add your example with documentation
4. Submit a pull request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for details.

## 📧 Support

- **Discord**: [Join our community](https://discord.gg/solence)
- **Email**: dev@solence.ai
- **Issues**: [GitHub Issues](https://github.com/solenceai/solence-api/issues)
