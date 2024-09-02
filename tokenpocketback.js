// backend.js
async function connectWalletWithQR() {
    console.log("Connecting with QR..."); // Debug log
    try {
        // Create WalletConnect Provider for Binance Smart Chain
        const provider = new WalletConnectProvider.default({
            rpc: {
                56: "https://bsc-dataseed.binance.org/", // BSC mainnet RPC URL
                1: "https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID" // Ethereum mainnet RPC URL
            },
            chainId: 56, // Default to Binance Smart Chain Mainnet Chain ID
        });

        // Enable session (triggers QR Code modal for mobile wallet connection)
        await provider.enable();

        // Create Web3 instance using the provider
        const web3 = new Web3(provider);

        // Get accounts from the connected wallet
        const accounts = await web3.eth.getAccounts();
        document.getElementById("account").innerText = "Connected account: " + accounts[0];

        // Get balance of the connected account
        const balance = await web3.eth.getBalance(accounts[0]);
        document.getElementById("balance").innerText = "Balance: " + web3.utils.fromWei(balance, "ether") + " BNB";

    } catch (error) {
        console.error("Error connecting wallet:", error);
    }
}
