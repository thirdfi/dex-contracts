module.exports = {
    ethereum: { //ETHEREUM
        routerAddr: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
        //"0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", //sushiswap
        trustedForwarder: "0x84a0856b038eaAd1cC7E297cF34A7e72685A8693"
    },
    bnb: { //BSC
        routerAddr: "0x10ED43C718714eb63d5aA57B78B54704E256024E", //pancakeswap
        trustedForwarder: "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8"
    },
    polygon: { //POLYGON
        routerAddr: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", //quickswap
        trustedForwarder: "0xf0511f123164602042ab2bCF02111fA5D3Fe97CD"
    },
    avalanche: { //AVALANCHE
        routerAddr: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4", //traderJoe
        //"0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106", //pangolin
        trustedForwarder: "0x64CD353384109423a966dCd3Aa30D884C9b2E057"
    },
    arbitrum: { //ARBITRUM
        routerAddr: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushiswap
        trustedForwarder: "0xfe0fa3C06d03bDC7fb49c892BbB39113B534fB57"
    },
    goerli: { //GOERLI
        routerAddr: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushiswap
        trustedForwarder: "0xE041608922d06a4F26C0d4c27d8bCD01daf1f792"
    },
    "arbitrum-goerli": {
        routerAddr: "0x68891aF9f277aB98659Ea9Df965Ca1151637f93b", //sushiswap
        trustedForwarder: "0x67454E169d613a8e9BA6b06af2D267696EAaAf41"
    },
    "maticmum" : { //polygon-testnet
        routerAddr: "0xb3756Cb11935921aE368654E4bd0E9ccCA3308C3",
        trustedForwarder: "0x69015912AA33720b842dCD6aC059Ed623F28d9f7"
    },
    fuji: { //avalanche-testnet
        routerAddr: "0x0F454D927d33e77AB9b0258814777c150D13c198", //pangolin
        trustedForwarder: "0x6271Ca63D30507f2Dcbf99B52787032506D75BBF"
    },
    bnbt: { //bsc-testnet
        routerAddr: "0xC26FF53b16097cDD77106358730383f628275e75", //sushiswap
        trustedForwarder: "0x61456BF1715C1415730076BB79ae118E806E74d2"
    },
    "optimism-goerli": {
        routerAddr: "0x0d5caCf39487C769bda95Ef2C2704331071631C1", //velodrome
        trustedForwarder: "0x9C73373C70F23920EA54F7883dCB1F85b162Df40"
    },
    optimism: {
        routerAddr: "0x9c12939390052919aF3155f41Bf4160Fd3666A6f", //velodrome
        trustedForwarder: "0xefba8a2a82ec1fb1273806174f5e28fbb917cf95"
    },
}