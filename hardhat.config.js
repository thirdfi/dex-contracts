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
    }
  },

  solidity: "0.8.13",

  mocha: {
    timeout: 70000000
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }

};