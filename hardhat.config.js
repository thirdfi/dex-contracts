require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-etherscan");
require('hardhat-conflux');
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

    "arbitrum-goerli": {
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
    kcc: {
      url: process.env.RPC_KCC,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    "kcc-testnet": {
      url: process.env.RPC_KCC_TESTNET,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    cronos: {
      url: process.env.RPC_CRONOS,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    cronosTestnet: {
      url: process.env.RPC_CRONOS_TESTNET,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    okc: {
      url: process.env.RPC_OKC,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    okcTestnet: {
      url: process.env.RPC_OKC_TESTNET,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    },
    conflux: {
      url: process.env.RPC_CONFLUX,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 1030,
    },
    confluxTestnet: {
      url: process.env.RPC_CONFLUX,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
      chainId: 71,
    }
  },

  solidity: "0.8.13",

  mocha: {
    timeout: 70000000
  },
  etherscan: {
    apiKey: {
      polygon: process.env.POLYGONSCAN_KEY,
      bsc: process.env.BSCSCAN_KEY,
      bscTestnet: process.env.BSC_TESTNET_KEY,
      arbitrumOne: process.env.ARBISCAN_KEY,
      avalanche: process.env.AVAX_KEY,
      mainnet: process.env.ETHERSCAN_KEY,
      optimisticGoerli: process.env.OPTIMISM_KEY,
      polygonMumbai: process.env.POLYGONSCAN_KEY,
      "arbitrum-goerli": process.env.ARBISCAN_KEY,
      avalancheFujiTestnet: process.env.AVAX_KEY,
      goerli: process.env.ETHERSCAN_KEY,
      optimisticEthereum: process.env.OPTIMISM_KEY,
      "kcc-testnet": process.env.KCCSCAN_KEY,
      kcc: process.env.KCCSCAN_KEY,
      cronos: process.env.CRONOS_KEY,
      cronosTestnet: process.env.CRONOS_KEY,
      okc: process.env.OKX_KEY,
      conflux: process.env.CONFLUX_KEY,
      confluxTestnet: "10f0dbeddc4f4d5db1ec68dbf3f3575c"
    },
    customChains: [
      {
        network: "arbitrum-goerli",
        chainId: 421613,
        urls: {
          apiURL: "https://api-goerli.arbiscan.io/api",
          browserURL: "https://goerli.arbiscan.io"
        }
      },
      {
        network: "kcc",
        chainId: 321,
        urls: {
          apiURL: `https://api.explorer.kcc.io/vipapi/kcs/contract/submitContractCode?apikey=${process.env.KCCSCAN_KEY}`,
          browserURL: "https://explorer.kcc.io"
        }
      },
      {
        network: "kcc-testnet",
        chainId: 322,
        urls: {
          apiURL: "https://scan-testnet.kcc.network/api",
          browserURL: "https://scan-testnet.kcc.network"
        }
      },
      {
        network: "cronosTestnet",
        chainId: 338,
        urls: {
          apiURL: "https://api-testnet.cronoscan.com/api",
          browserURL: "https://testnet.cronoscan.com"
        }
      },
      {
        network: "cronos",
        chainId: 25,
        urls: {
          apiURL: "https://api.cronoscan.com/api",
          browserURL: "https://cronoscan.com"
        }
      },
      {
        network: "confluxTestnet",
        chainId: 71,
        urls: {
          apiURL: "https://evmapi-testnet.confluxscan.net/api",
          browserURL: "https://evmtestnet.confluxscan.net"
        }
      }
    ]

  }

};