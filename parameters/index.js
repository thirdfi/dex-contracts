module.exports = {
    ethereum: { //ETHEREUM
        routerAddr: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Uniswap V2 Router
        //"0xd9e1cE17f2641f24aE83637ab66a2cca9C378B9F", //sushiswap
        trustedForwarder: "0x84a0856b038eaAd1cC7E297cF34A7e72685A8693",
        Proxy: "0x14EE436f26D9d052A0E52368536A9AaFc36541c2",
    },
    bnb: { //BSC
        routerAddr: "0x10ED43C718714eb63d5aA57B78B54704E256024E", //pancakeswap
        trustedForwarder: "0x86C80a8aa58e0A4fa09A69624c31Ab2a6CAD56b8",
        Proxy: "0x013B7E3D393DCE5fDb8C2F7890419cbd8ca8F7EE",
    },
    matic: { //POLYGON
        routerAddr: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff", //quickswap
        trustedForwarder: "0x86c80a8aa58e0a4fa09a69624c31ab2a6cad56b8",
        Proxy: "0xF2b9a3aE5B765556f2e2934173CB1F957c8ED50B",
    },
    avalanche: { //AVALANCHE
        routerAddr: "0x60aE616a2155Ee3d9A68541Ba4544862310933d4", //traderJoe
        //"0xE54Ca86531e17Ef3616d22Ca28b0D458b6C89106", //pangolin
        trustedForwarder: "0x64CD353384109423a966dCd3Aa30D884C9b2E057",
        Proxy: "0x4bC80867F578b0d9202f20B55563F9284267c4df",
    },
    arbitrum: { //ARBITRUM
        routerAddr: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushiswap
        trustedForwarder: "0xfe0fa3C06d03bDC7fb49c892BbB39113B534fB57",
        Proxy: "0x981aE6155F8CF24F67e30CA8d90ab6FaEB472aE5",
    },
    goerli: { //GOERLI
        routerAddr: "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506", //sushiswap
        trustedForwarder: "0xE041608922d06a4F26C0d4c27d8bCD01daf1f792",
        Proxy: "0x03480A05c6CD9880c3B4dd664D7d49f7b45cF177",
    },
    "arbitrum-goerli": {
        routerAddr: "0x68891aF9f277aB98659Ea9Df965Ca1151637f93b", //sushiswap
        trustedForwarder: "0x67454E169d613a8e9BA6b06af2D267696EAaAf41",
        Proxy: "0xa11Fc6C77b537Db9aD61e898D7CEaeB22c1ACbB1",
    },
    "maticmum": { //polygon-testnet
        routerAddr: "0xb3756Cb11935921aE368654E4bd0E9ccCA3308C3",
        trustedForwarder: "0x69015912AA33720b842dCD6aC059Ed623F28d9f7",
        Proxy: "0x477b15aFA64ba3ae52426215ab8407d176344719",
    },
    fuji: { //avalanche-testnet
        routerAddr: "0x0F454D927d33e77AB9b0258814777c150D13c198", //pangolin
        trustedForwarder: "0x6271Ca63D30507f2Dcbf99B52787032506D75BBF",
        Proxy: "0x740Cc6f58fAA7ddE3337215a996610858E76f1b0",
    },
    bnbt: { //bsc-testnet
        routerAddr: "0xC26FF53b16097cDD77106358730383f628275e75", //sushiswap
        trustedForwarder: "0x61456BF1715C1415730076BB79ae118E806E74d2",
        Proxy: "0x1a45939d2cd21f2fde107b0628e7848bc0661459",
    },
    "optimism-goerli": {
        routerAddr: "0x0d5caCf39487C769bda95Ef2C2704331071631C1", //velodrome
        trustedForwarder: "0x9C73373C70F23920EA54F7883dCB1F85b162Df40",
        Proxy: "0xE3559d04Cfd810306a1BF8F820e42e73c14901A3",
    },
    optimism: {
        routerAddr: "0x9c12939390052919aF3155f41Bf4160Fd3666A6f", //velodrome
        trustedForwarder: "0xefba8a2a82ec1fb1273806174f5e28fbb917cf95",
        Proxy: "0x981aE6155F8CF24F67e30CA8d90ab6FaEB472aE5",
    },
    kcc: {
        routerAddr: "0xA58350d6dEE8441aa42754346860E3545cc83cdA", //kuswap
        trustedForwarder: "0x0000000000000000000000000000000000000000",
        nativeWrappedToken: "0x4446Fc4eb47f2f6586f9fAAb68B3498F86C07521"
    },
    "kcc-testnet": {
        routerAddr: "0xc5f442007e08e3b13C9f95fA22F2a2B9369d7C8C", //kuswap
        trustedForwarder: "0x0000000000000000000000000000000000000000",
        nativeWrappedToken: "0xB296bAb2ED122a85977423b602DdF3527582A3DA"
    }
}