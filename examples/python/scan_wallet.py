"""
Solence API - Python Example

This example demonstrates how to integrate Solence wallet scanning
into your Python application.

Requirements:
    pip install requests
"""

import requests
from typing import Dict, List, Optional
from datetime import datetime


SOLENCE_API_URL = "https://solence.ai/api"


class SolenceClient:
    """Client for interacting with the Solence API"""
    
    def __init__(self, api_key: Optional[str] = None):
        """
        Initialize the Solence client
        
        Args:
            api_key: Optional API key for authenticated requests
        """
        self.api_url = SOLENCE_API_URL
        self.api_key = api_key
        self.session = requests.Session()
        
        if api_key:
            self.session.headers.update({"X-API-Key": api_key})
    
    def scan_wallet(self, wallet_address: str, is_public: bool = False) -> Dict:
        """
        Scan a Solana wallet and get risk assessment
        
        Args:
            wallet_address: Base58 encoded Solana wallet address
            is_public: Opt-in to publish scan results
            
        Returns:
            Dict containing scan results
            
        Raises:
            requests.HTTPError: If the API request fails
        """
        url = f"{self.api_url}/scan"
        payload = {
            "wallet": wallet_address,
            "isPublic": is_public
        }
        
        response = self.session.post(url, json=payload)
        response.raise_for_status()
        
        return response.json()
    
    def get_scan_history(
        self, 
        wallet_address: str, 
        limit: int = 10, 
        skip: int = 0
    ) -> Dict:
        """
        Get scan history for a wallet
        
        Args:
            wallet_address: Wallet to query
            limit: Number of results (max 50)
            skip: Number of results to skip
            
        Returns:
            Dict containing scan history
        """
        url = f"{self.api_url}/scans"
        params = {
            "wallet": wallet_address,
            "limit": limit,
            "skip": skip
        }
        
        response = self.session.get(url, params=params)
        response.raise_for_status()
        
        return response.json()
    
    def verify_badge(self, wallet_address: str) -> Dict:
        """
        Check if a wallet has a Safety Badge
        
        Args:
            wallet_address: Wallet to check
            
        Returns:
            Dict containing badge verification result
        """
        url = f"{self.api_url}/badge/verify"
        params = {"wallet": wallet_address}
        
        response = self.session.get(url, params=params)
        response.raise_for_status()
        
        return response.json()
    
    def mint_badge(self, wallet_address: str, scan_id: str) -> Dict:
        """
        Mint a Safety Badge for a qualifying wallet
        
        Note: Requires authentication and wallet must have score >= 75
        
        Args:
            wallet_address: Wallet to mint badge for
            scan_id: ID of the scan result
            
        Returns:
            Dict containing mint transaction details
        """
        if not self.api_key:
            raise ValueError("API key required for badge minting")
        
        url = f"{self.api_url}/badge/mint"
        payload = {
            "wallet": wallet_address,
            "scanId": scan_id
        }
        
        response = self.session.post(url, json=payload)
        response.raise_for_status()
        
        return response.json()


def print_scan_results(result: Dict):
    """Pretty print scan results"""
    print("\n" + "="*60)
    print("📊 SCAN RESULTS")
    print("="*60)
    
    print(f"\n🎯 Score: {result['score']}/100")
    print(f"⚠️  Risk Level: {result['riskLevel']}")
    
    print(f"\n🤖 AI Insights:")
    print(f"{result['aiSummary']}")
    
    details = result['walletDetails']
    print(f"\n💼 Wallet Details:")
    print(f"   SOL Balance: {details['solBalance']} SOL")
    print(f"   Tokens: {details['tokenCount']}")
    print(f"   NFTs: {details['nftCount']}")
    print(f"   Transactions: {details['txCount']}")
    print(f"   Account Age: {details['accountAgeDays']} days")
    
    if details['lastActivity']:
        last_active = datetime.fromisoformat(details['lastActivity'].replace('Z', '+00:00'))
        print(f"   Last Active: {last_active.strftime('%Y-%m-%d %H:%M:%S')}")
    
    print(f"\n📋 Findings:")
    for i, finding in enumerate(result['findings'], 1):
        print(f"   {i}. {finding}")
    
    print("\n" + "="*60 + "\n")


def main():
    """Example usage"""
    # Initialize client (no API key needed for scanning)
    client = SolenceClient()
    
    # Test wallet
    test_wallet = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
    
    try:
        # Scan wallet
        print("🔍 Scanning wallet...")
        result = client.scan_wallet(test_wallet)
        print_scan_results(result)
        
        # Check for Safety Badge
        print("🏅 Checking for Safety Badge...")
        badge_status = client.verify_badge(test_wallet)
        
        if badge_status['hasBadge']:
            print("✅ This wallet has a verified Safety Badge!")
            minted = datetime.fromisoformat(badge_status['mintedAt'].replace('Z', '+00:00'))
            print(f"   Minted: {minted.strftime('%Y-%m-%d')}")
            print(f"   Mint Address: {badge_status['mintAddress']}")
        else:
            print("❌ No Safety Badge found")
            if result['score'] >= 75:
                print("💡 This wallet qualifies for a Safety Badge!")
        
        # Get scan history
        print(f"\n📚 Getting scan history...")
        history = client.get_scan_history(test_wallet, limit=5)
        print(f"Total scans: {history['total']}")
        
        for i, scan in enumerate(history['scans'], 1):
            created = datetime.fromisoformat(scan['createdAt'].replace('Z', '+00:00'))
            date_str = created.strftime('%Y-%m-%d')
            print(f"   {i}. {date_str} - Score: {scan['score']} ({scan['riskLevel']})")
        
    except requests.HTTPError as e:
        print(f"❌ API Error: {e}")
        print(f"Response: {e.response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    main()
