require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config()
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: process.env.RPC_MAINNET,
        blockNumber: 7516516
      },
    },
    local: {
      url: "http://127.0.0.1:8545"
    },

    ethereum: {
      url: process.env.RPC_MAINNET,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },

    bnb: {
      url: process.env.RPC_BSC,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },

    polygon: {
      url: process.env.RPC_POLYGON,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },

    avalanche: {
      url: process.env.RPC_AVALANCHE,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },

    arbitrum: {
      url: process.env.RPC_ARBITRUM,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },

    goerli: {
      url: process.env.RPC_GOERLI,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },

    "arbitrum-goerli" : {
      url: process.env.RPC_ARBITRUM_GOERLI,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    "maticmum": { //polygon testnet
      url: process.env.RPC_MUMBAI,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    fuji: { //avalanche testnet
      url: process.env.RPC_FUJI,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    bnbt: {
      url: process.env.RPC_BSC_TESTNET,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    optimismGoerli: {
      url: process.env.RPC_OPTIMISM_GOERLI,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    optimism: {
      url: process.env.RPC_OPTIMISM,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
  },

  solidity: "0.8.13",

  mocha: {
    timeout: 70000000
  },

  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_KEY,
      bsc: process.env.BSCSCAN_KEY,
      arbitrumOne: process.env.ARBISCAN_KEY,
      avalanche: process.env.AVAX_KEY,
      mainnet: process.env.ETHERSCAN_KEY,

      polygonMumbai: process.env.POLYGONSCAN_KEY,
      arbitrumTestnet: process.env.ARBISCAN_KEY,
      avalancheFujiTestnet: process.env.AVAX_KEY,
      goerli: process.env.ETHERSCAN_KEY,
      optimisticEthereum: process.env.OPTIMISM_KEY,
      customChains: [
        {
          network: "arbitrumTestnet",
          chainId: 421613,
          urls: {
            apiURL: "https://api-goerli.arbiscan.io/api",
            browserURL: "https://goerli.arbiscan.io"
          }
        }
      ]
    }

  }

};