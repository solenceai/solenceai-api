# Security Policy

## 🔐 Reporting Security Vulnerabilities

We take the security of Solence API seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to **security@solence.ai**

You should receive a response within 48 hours. If for some reason you do not, please follow up via email to ensure we received your original message.

## 📋 What to Include

Please include the following information in your report:

* Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
* Full paths of source file(s) related to the manifestation of the issue
* The location of the affected source code (tag/branch/commit or direct URL)
* Any special configuration required to reproduce the issue
* Step-by-step instructions to reproduce the issue
* Proof-of-concept or exploit code (if possible)
* Impact of the issue, including how an attacker might exploit it

This information will help us triage your report more quickly.

## 🎯 Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## 🛡️ Security Measures

### API Security

* **Rate Limiting**: All endpoints are rate-limited to prevent abuse
* **Input Validation**: All user inputs are validated and sanitized
* **HTTPS Only**: All API communication is encrypted via TLS 1.3
* **No Private Keys**: We never request or store private keys or seed phrases
* **Read-Only Access**: Wallet scanning is performed with read-only blockchain access

### Data Privacy

* **Minimal Data Collection**: We only store wallet addresses and scan results
* **No Personal Information**: No personal identifiable information is collected
* **Public Blockchain Data Only**: All scanned data is publicly available on-chain
* **Opt-in Public Cards**: Wallets are only made public if explicitly opted in by the user

### Infrastructure Security

* **DDoS Protection**: Cloudflare protection on all endpoints
* **Database Encryption**: All stored data is encrypted at rest
* **Secure Dependencies**: Regular dependency updates and vulnerability scanning
* **Environment Isolation**: Development, staging, and production environments are isolated

## 🔍 Known Security Considerations

### Rate Limiting

Free tier users are limited to:
* 10 scan requests per hour per IP address
* 100 scan requests per day per IP address

Authenticated users have higher limits based on their tier.

### API Key Security

If you have an API key:

* **Never commit API keys to Git repositories**
* **Use environment variables** to store keys
* **Rotate keys regularly** (at least every 90 days)
* **Use different keys** for development and production
* **Revoke compromised keys immediately** via the dashboard

### WebSocket Connections

* WebSocket connections are rate-limited to 10 concurrent connections per IP
* Connection lifetime is limited to 5 minutes
* Automatic reconnection with exponential backoff is recommended

## 🚨 Incident Response

In the event of a confirmed security incident:

1. **Immediate Response** (0-24 hours)
   - Incident is triaged and severity assessed
   - Affected systems are isolated if necessary
   - Core team is notified

2. **Investigation** (1-3 days)
   - Root cause analysis performed
   - Scope of impact determined
   - Remediation plan developed

3. **Resolution** (3-7 days)
   - Security patch developed and tested
   - Patch deployed to production
   - Affected users notified (if applicable)

4. **Post-Mortem** (7-14 days)
   - Incident report published
   - Lessons learned documented
   - Prevention measures implemented

## 🏆 Bug Bounty Program

We currently do not have a formal bug bounty program, but we recognize and appreciate security researchers who help keep Solence secure.

Valid security reports may be eligible for:
* Public acknowledgment (with your permission)
* Swag and merchandise
* Feature in our Hall of Fame
* Future bounty rewards (when program launches)

## 📞 Contact

* **Security Email**: security@solence.ai
* **General Support**: support@solence.ai
* **PGP Key**: Available upon request

## 🔗 Security Resources

* [OWASP Top 10](https://owasp.org/www-project-top-ten/)
* [Solana Security Best Practices](https://docs.solana.com/developing/programming-model/security)
* [API Security Best Practices](https://owasp.org/www-project-api-security/)

## 📜 Disclosure Policy

* We will respond to your report within 48 hours with our evaluation and expected resolution date
* We will handle your report with strict confidentiality and not share your information with third parties without permission
* We will keep you informed of progress towards resolving the issue
* We will credit you (if desired) when disclosing the vulnerability

Thank you for helping keep Solence and our users safe! 🙏
