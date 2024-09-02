const express = require('express');
const bodyParser = require('body-parser');
const Web3 = require('web3');
const WalletConnectProvider = require('@walletconnect/web3-provider').default;

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from 'public' directory

app.post('/connect', async (req, res) => {
    const { walletType } = req.body;

    if (walletType === 'trustwallet') {
        try {
            // Create WalletConnect Provider for Binance Smart Chain
            const provider = new WalletConnectProvider({
                rpc: {
                    56: 'https://bsc-dataseed.binance.org/',
                },
                chainId: 56,
            });

            // Enable session (triggers QR Code modal for mobile wallet connection)
            await provider.enable();

            // Create Web3 instance using the provider
            const web3 = new Web3(provider);

            // Get accounts from the connected wallet
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);
            const balanceInEth = web3.utils.fromWei(balance, 'ether');

            res.json({
                account: accounts[0],
                balance: balanceInEth,
                currency: 'BNB',
            });
        } catch (error) {
            console.error('Error connecting wallet:', error);
            res.status(500).json({ error: 'An error occurred' });
        }
    } else {
        res.status(400).json({ message: 'Unsupported wallet type.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
