const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config(".env");

module.exports = {
    networks: {
        rinkeby: {
            provider: () => new HDWalletProvider(process.env.PRIVKEY, 'https://rinkeby.infura.io/v3/<YOUR_KEY>'),
            network_id: 4
        },
        eth: {
            provider: () => new HDWalletProvider(process.env.PRIVKEY, 'https://mainnet.infura.io/v3/<YOUR_KEY>'),
            network_id: 1
        },
        testnet: {
            provider: () => new HDWalletProvider(process.env.PRIVKEY, 'https://data-seed-prebsc-1-s3.binance.org:8545'),
            network_id: 97,
            confirmations: 2,
            skipDryRun: true,
            networkCheckTimeout: 500000000,
            timeoutBlocks: 20000
        },
        bsc: {
            provider: () => new HDWalletProvider(process.env.PRIVKEY, 'https://bsc.getblock.io/mainnet/?api_key=<YOUR_KEY>'),
            network_id: 56,
            confirmations: 2,
            skipDryRun: true,
            networkCheckTimeout: 500000000,
            gasPrice: 10000000000
        },
        mumbai: {
            provider: () => new HDWalletProvider(process.env.PRIVKEY, 'https://matic-mumbai.chainstacklabs.com'),
            network_id: 80001,
            confirmations: 2,
            skipDryRun: true
        },
        polygon: {
            provider: () => new HDWalletProvider(process.env.PRIVKEY, 'https://polygon-rpc.com'),
            network_id: 137,
            confirmations: 2,
            skipDryRun: true,
            gasPrice: 50000000000
        }
    },
    plugins: ["solidity-coverage", "truffle-plugin-verify"],
    api_keys: {
        etherscan: process.env.ETHERSCANAPIKEY,
        bscscan: process.env.BSCSCANAPIKEY,
        polygonscan: process.env.POLYGONSCANAPIKEY
    },
    compilers: {
        solc: {
            version: '^0.8.0',
            settings: {
                optimizer: {
                    enabled: true
                }
            }
        }
    }
};
