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
    },
    cronosTestnet: {
        routerAddr: "0xf564ef0034bb7d7cd84412275e1e51364d4d7734", //velodrome
        trustedForwarder: "0x0000000000000000000000000000000000000000",
        Proxy: "",
        nativeTokenAddress: "0x6a3173618859C7cd40fAF6921b5E9eB6A76f1fD4"
    },
    cronosMainnet: {
        routerAddr: "0x145863Eb42Cf62847A6Ca784e6416C1682b1b2Ae",
        trustedForwarder: "0x0000000000000000000000000000000000000000",
        Proxy: "",
        nativeTokenAddress: "0x5c7f8a570d578ed84e63fdfa7b1ee72deae1ae23",
    },
    okc: {
        routerAddr: "0xc97b81B8a38b9146010Df85f1Ac714aFE1554343", 
        trustedForwarder: "0x0000000000000000000000000000000000000000",
        proxy: "",
        nativeToken: "0x8f8526dbfd6e38e3d8307702ca8469bae6c56c15"
    },
    okcTestnet: {
        routerAddr: "0x5233245E3256B845ff8249E87Eede5973Bc7A5c7", // Uniswap V2 Router
        trustedForwarder: "0x0000000000000000000000000000000000000000", //zero address
        proxy: "0xc7963592D629ebc02C769167E0a47C5D6dbdd491",
        nativeToken: "0x2219845942d28716c0f7c605765fabdca1a7d9e0"
    },
    conflux: {
        routerAddr: "0x62b0873055bf896dd869e172119871ac24aea305",
        trustedForwarder: "0x0000000000000000000000000000000000000000",
        Proxy: "TBA",
        nativeToken: "0x14b2d3bc65e74dae1030eafd8ac30c533c976a9b"
    },
    confluxTestnet: {
        routerAddr: "0x873789aaf553fd0b4252d0d2b72c6331c47aff2e", // Swappi Router
        trustedForwarder: "0x0000000000000000000000000000000000000000",
        Proxy: "0xAF4eCFeD91cdD1380FbCb1bdE751ecd617c1333e",
        nativeToken: "0x2ed3dddae5b2f321af0806181fbfa6d049be47d8"
    }
}
