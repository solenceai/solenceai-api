/**
 * Solence API - JavaScript/Node.js Example
 * 
 * This example demonstrates how to integrate Solence wallet scanning
 * into your Node.js or browser-based application.
 */

const SOLENCE_API_URL = 'https://solence.ai/api';

/**
 * Scan a Solana wallet
 * @param {string} walletAddress - Base58 encoded Solana wallet address
 * @returns {Promise<Object>} Scan results
 */
async function scanWallet(walletAddress) {
  try {
    const response = await fetch(`${SOLENCE_API_URL}/scan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        wallet: walletAddress
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Scan failed:', error.message);
    throw error;
  }
}

/**
 * Get scan history for a wallet
 * @param {string} walletAddress - Wallet to query
 * @param {number} limit - Number of results
 * @returns {Promise<Object>} Scan history
 */
async function getScanHistory(walletAddress, limit = 10) {
  try {
    const params = new URLSearchParams({
      wallet: walletAddress,
      limit: limit.toString()
    });

    const response = await fetch(`${SOLENCE_API_URL}/scans?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to get history:', error.message);
    throw error;
  }
}

/**
 * Verify if a wallet has a Safety Badge
 * @param {string} walletAddress - Wallet to check
 * @returns {Promise<Object>} Badge verification result
 */
async function verifyBadge(walletAddress) {
  try {
    const params = new URLSearchParams({
      wallet: walletAddress
    });

    const response = await fetch(`${SOLENCE_API_URL}/badge/verify?${params}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${await response.text()}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Badge verification failed:', error.message);
    throw error;
  }
}

// Example Usage
async function main() {
  const testWallet = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';

  console.log('🔍 Scanning wallet...');
  const scanResult = await scanWallet(testWallet);
  
  console.log('\n📊 Scan Results:');
  console.log(`Score: ${scanResult.score}/100`);
  console.log(`Risk Level: ${scanResult.riskLevel}`);
  console.log(`\n🤖 AI Insights:\n${scanResult.aiSummary}`);

  console.log('\n💼 Wallet Details:');
  console.log(`SOL Balance: ${scanResult.walletDetails.solBalance} SOL`);
  console.log(`Tokens: ${scanResult.walletDetails.tokenCount}`);
  console.log(`NFTs: ${scanResult.walletDetails.nftCount}`);
  console.log(`Transactions: ${scanResult.walletDetails.txCount}`);
  console.log(`Account Age: ${scanResult.walletDetails.accountAgeDays} days`);

  console.log('\n📜 Findings:');
  scanResult.findings.forEach((finding, i) => {
    console.log(`${i + 1}. ${finding}`);
  });

  // Check for Safety Badge
  console.log('\n🏅 Checking for Safety Badge...');
  const badgeStatus = await verifyBadge(testWallet);
  
  if (badgeStatus.hasBadge) {
    console.log('✅ This wallet has a verified Safety Badge!');
    console.log(`Minted: ${new Date(badgeStatus.mintedAt).toLocaleDateString()}`);
  } else {
    console.log('❌ No Safety Badge found');
    if (scanResult.score >= 75) {
      console.log('💡 This wallet qualifies for a Safety Badge!');
    }
  }

  // Get scan history
  console.log('\n📚 Recent scan history...');
  const history = await getScanHistory(testWallet, 5);
  console.log(`Total scans: ${history.total}`);
  
  history.scans.forEach((scan, i) => {
    const date = new Date(scan.createdAt).toLocaleDateString();
    console.log(`${i + 1}. ${date} - Score: ${scan.score} (${scan.riskLevel})`);
  });
}

// Run the example
if (require.main === module) {
  main().catch(console.error);
}

// Export functions for use in other modules
module.exports = {
  scanWallet,
  getScanHistory,
  verifyBadge
};
