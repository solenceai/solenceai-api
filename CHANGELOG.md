# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- WebSocket support for real-time scan updates
- GraphQL API endpoint
- Historical trend analysis
- Multi-wallet batch scanning
- Webhook notifications

## [1.0.0] - 2025-01-15

### Added
- Initial public release of Solence API
- POST `/api/scan` endpoint for wallet scanning
- GET `/api/scans` endpoint for scan history
- POST `/api/badge/mint` endpoint for Safety Badge minting
- GET `/api/badge/verify` endpoint for badge verification
- Deterministic risk scoring algorithm (0-100 scale)
- AI-powered security insights via OpenAI
- Rate limiting (10 requests/hour for free tier)
- Comprehensive API documentation
- Interactive playground at solenceai.com/playground
- Support for Solana mainnet and devnet
- Wallet details including balance, tokens, NFTs, and transaction count
- On-chain Safety Badge as SPL token

### Security
- TLS 1.3 encryption for all API endpoints
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration for web clients

## [0.9.0] - 2025-01-10 (Beta)

### Added
- Beta release for testing
- Core scanning functionality
- Basic AI insights
- Rate limiting implementation

### Changed
- Improved scoring accuracy by 15%
- Optimized RPC calls to reduce latency
- Enhanced error messages

### Fixed
- Token parsing for NFTs with 0 decimals
- Rate limit calculation for authenticated users
- Memory leak in long-running processes

## [0.8.0] - 2025-01-05 (Alpha)

### Added
- Alpha release for internal testing
- Prototype scoring engine
- Basic wallet data fetching
- MongoDB integration for scan history

### Known Issues
- NFT detection sometimes inaccurate
- Rate limiting not yet implemented
- AI insights placeholder text

## [0.7.0] - 2024-12-28 (Internal)

### Added
- Initial prototype
- Proof of concept for Solana wallet scanning
- Basic REST API structure
- Connection to Solana RPC

---

## Version History Summary

- **1.0.0** (2025-01-15) - Public release ✨
- **0.9.0** (2025-01-10) - Beta testing
- **0.8.0** (2025-01-05) - Alpha testing
- **0.7.0** (2024-12-28) - Initial prototype

## Upcoming Releases

### [1.1.0] - Expected Q1 2025

**Focus**: Enhanced Features
- WebSocket support for real-time updates
- Batch wallet scanning (up to 100 wallets)
- Enhanced AI model with custom training data
- Historical trend analysis (7-day, 30-day, 90-day)

### [1.2.0] - Expected Q2 2025

**Focus**: Integration & Automation
- GraphQL API endpoint
- Webhook notifications for scan completion
- Zapier integration
- Discord bot for automated scanning
- Telegram bot support

### [2.0.0] - Expected Q3 2025

**Focus**: Advanced Analytics
- Machine learning-based anomaly detection
- Predictive risk scoring
- Cross-chain support (initial: Ethereum)
- Advanced visualization dashboard
- Custom scoring policies for enterprises

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## Links

- [Documentation](https://solenceai.com/docs)
- [API Playground](https://solenceai.com/playground)
- [Status Page](https://solenceai.com/status)
- [GitHub Issues](https://github.com/solenceai/solence-api/issues)

[Unreleased]: https://github.com/solenceai/solence-api/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/solenceai/solence-api/releases/tag/v1.0.0
[0.9.0]: https://github.com/solenceai/solence-api/releases/tag/v0.9.0
[0.8.0]: https://github.com/solenceai/solence-api/releases/tag/v0.8.0
[0.7.0]: https://github.com/solenceai/solence-api/releases/tag/v0.7.0
