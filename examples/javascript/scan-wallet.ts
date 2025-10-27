/**
 * Solence API - TypeScript Example
 * 
 * Type-safe integration example for TypeScript projects
 */

// Types
interface WalletDetails {
  solBalance: number | null;
  tokenCount: number | null;
  nftCount: number | null;
  txCount: number | null;
  accountAgeDays: number | null;
  lastActivity: string | null;
  firstActivity: string | null;
}

interface ScanResult {
  _id: string;
  wallet: string;
  score: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  findings: string[];
  aiSummary: string;
  walletDetails: WalletDetails;
  createdAt: string;
  meta: {
    createdByWallet: string | null;
    isPublic: boolean;
  };
}

interface ScanHistory {
  wallet: string;
  total: number;
  scans: Array<{
    _id: string;
    score: number;
    riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: string;
  }>;
}

interface BadgeStatus {
  wallet: string;
  hasBadge: boolean;
  mintAddress?: string;
  mintedAt?: string;
  score?: number;
}

interface MintResult {
  success: boolean;
  signature: string;
  mintAddress: string;
  explorerUrl: string;
}

// Client Configuration
interface SolenceConfig {
  apiUrl?: string;
  apiKey?: string;
  timeout?: number;
}

// Solence Client
class SolenceClient {
  private apiUrl: string;
  private apiKey?: string;
  private timeout: number;

  constructor(config: SolenceConfig = {}) {
    this.apiUrl = config.apiUrl || 'https://solenceai.com/api';
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 30000;
  }

  /**
   * Scan a Solana wallet
   */
  async scanWallet(
    walletAddress: string,
    isPublic: boolean = false
  ): Promise<ScanResult> {
    const response = await this.request<ScanResult>('/scan', {
      method: 'POST',
      body: JSON.stringify({
        wallet: walletAddress,
        isPublic
      })
    });

    return response;
  }

  /**
   * Get scan history for a wallet
   */
  async getScanHistory(
    walletAddress: string,
    limit: number = 10,
    skip: number = 0
  ): Promise<ScanHistory> {
    const params = new URLSearchParams({
      wallet: walletAddress,
      limit: limit.toString(),
      skip: skip.toString()
    });

    return this.request<ScanHistory>(`/scans?${params}`);
  }

  /**
   * Verify if wallet has a Safety Badge
   */
  async verifyBadge(walletAddress: string): Promise<BadgeStatus> {
    const params = new URLSearchParams({
      wallet: walletAddress
    });

    return this.request<BadgeStatus>(`/badge/verify?${params}`);
  }

  /**
   * Mint a Safety Badge (requires API key)
   */
  async mintBadge(
    walletAddress: string,
    scanId: string
  ): Promise<MintResult> {
    if (!this.apiKey) {
      throw new Error('API key required for badge minting');
    }

    return this.request<MintResult>('/badge/mint', {
      method: 'POST',
      body: JSON.stringify({
        wallet: walletAddress,
        scanId
      })
    });
  }

  /**
   * Internal request handler
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${this.timeout}ms`);
        }
        throw error;
      }
      
      throw new Error('Unknown error occurred');
    }
  }
}

// Helper function to display risk level with color
function getRiskEmoji(riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'): string {
  switch (riskLevel) {
    case 'LOW':
      return '✅';
    case 'MEDIUM':
      return '⚠️';
    case 'HIGH':
      return '⛔';
  }
}

// Example usage
async function main() {
  const client = new SolenceClient();
  const testWallet = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';

  try {
    console.log('🔍 Scanning wallet...\n');
    
    // Scan wallet
    const result = await client.scanWallet(testWallet);
    
    console.log('📊 SCAN RESULTS');
    console.log('═'.repeat(60));
    console.log(`Score: ${result.score}/100`);
    console.log(`Risk: ${getRiskEmoji(result.riskLevel)} ${result.riskLevel}`);
    console.log('\n🤖 AI Insights:');
    console.log(result.aiSummary);
    
    console.log('\n💼 Wallet Details:');
    console.log(`  SOL: ${result.walletDetails.solBalance ?? 'N/A'}`);
    console.log(`  Tokens: ${result.walletDetails.tokenCount ?? 'N/A'}`);
    console.log(`  NFTs: ${result.walletDetails.nftCount ?? 'N/A'}`);
    console.log(`  Transactions: ${result.walletDetails.txCount ?? 'N/A'}`);
    console.log(`  Age: ${result.walletDetails.accountAgeDays ?? 'N/A'} days`);
    
    console.log('\n📋 Findings:');
    result.findings.forEach((finding, i) => {
      console.log(`  ${i + 1}. ${finding}`);
    });
    
    // Check badge
    console.log('\n🏅 Checking Safety Badge...');
    const badgeStatus = await client.verifyBadge(testWallet);
    
    if (badgeStatus.hasBadge) {
      console.log('✅ Verified Safety Badge found!');
      console.log(`   Mint: ${badgeStatus.mintAddress}`);
    } else {
      console.log('❌ No badge found');
      if (result.score >= 75) {
        console.log('💡 Wallet qualifies for badge!');
      }
    }
    
    // Get history
    console.log('\n📚 Recent Scans:');
    const history = await client.getScanHistory(testWallet, 5);
    history.scans.forEach((scan, i) => {
      const date = new Date(scan.createdAt).toLocaleDateString();
      console.log(`  ${i + 1}. ${date} - ${scan.score} (${scan.riskLevel})`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

// Export for use in other modules
export {
  SolenceClient,
  ScanResult,
  ScanHistory,
  BadgeStatus,
  MintResult,
  WalletDetails,
  SolenceConfig
};
