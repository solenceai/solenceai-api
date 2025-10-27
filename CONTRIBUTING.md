# Contributing to Solence API

First off, thank you for considering contributing to Solence API! It's people like you that make Solence such a great tool for the Solana community.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots or animated GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain the behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript styleguide
* Include thoughtfully-worded, well-structured tests
* Document new code based on the Documentation Styleguide
* End all files with a newline

## 🛠️ Development Setup

1. **Fork and clone the repo**
   ```bash
   git clone https://github.com/solenceai/solence-api.git
   cd solence-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run tests**
   ```bash
   npm test
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## 📝 Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
feat: add wallet batch scanning endpoint
fix: correct rate limit calculation for authenticated users
docs: update API reference with new parameters
test: add unit tests for scoring engine
refactor: simplify wallet validation logic
```

### TypeScript Styleguide

* Use 2 spaces for indentation
* Prefer `const` over `let`. Never use `var`
* Use semicolons
* Use template literals instead of string concatenation
* Use async/await instead of promises when possible
* Use meaningful variable names
* Add JSDoc comments for public APIs

Example:
```typescript
/**
 * Scans a Solana wallet and returns a security risk score
 * @param wallet - Base58 encoded Solana wallet address
 * @returns Promise resolving to scan results
 */
export async function scanWallet(wallet: string): Promise<ScanResult> {
  const publicKey = new PublicKey(wallet);
  const signals = await fetchSignals(publicKey);
  return computeScore(signals);
}
```

### Documentation Styleguide

* Use Markdown
* Reference functions and classes in backticks: \`scanWallet()\`
* Include code examples where helpful
* Keep lines to 80 characters or less when possible

## 🧪 Testing

* Write tests for all new features
* Ensure all tests pass before submitting PR
* Aim for >80% code coverage
* Use descriptive test names

```typescript
describe('scanWallet', () => {
  it('should return LOW risk for established wallets', async () => {
    const result = await scanWallet('VALID_WALLET_ADDRESS');
    expect(result.riskLevel).toBe('LOW');
  });

  it('should throw error for invalid wallet address', async () => {
    await expect(scanWallet('INVALID')).rejects.toThrow();
  });
});
```

## 📋 Pull Request Process

1. **Update the README.md** with details of changes to the interface, if applicable
2. **Update the CHANGELOG.md** following the Keep a Changelog format
3. **Ensure all tests pass** and add new tests for your changes
4. **Update documentation** if you've changed APIs
5. **Request review** from at least one maintainer
6. **Squash commits** before merging (maintainers can help with this)

## 🏷️ Issue and PR Labels

* `bug` - Something isn't working
* `documentation` - Improvements or additions to documentation
* `duplicate` - This issue or pull request already exists
* `enhancement` - New feature or request
* `good first issue` - Good for newcomers
* `help wanted` - Extra attention is needed
* `invalid` - This doesn't seem right
* `question` - Further information is requested
* `wontfix` - This will not be worked on

## 💬 Community

* Be welcoming and friendly
* Be patient and considerate
* Be respectful of differing viewpoints
* Gracefully accept constructive criticism
* Focus on what is best for the community

## 📧 Contact

* **Twitter**: [@SolenceAi](https://twitter.com/SolenceAi)
* **Email**: dev@solenceai.com

## 🙏 Recognition

Contributors who have made significant contributions will be recognized in our README and on our website.

Thank you for contributing to Solence! 🎉
