const { upgrades, ethers, run } = require("hardhat");
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

let params = require("../parameters")

const main = async () => {
    const [deployer] = await ethers.getSigners()

    let net = await ethers.provider.getNetwork()
    let DexForwarder
    if (net.chainId == 420 || net.chainId == 10) { //optimism and optimism goerli
        DexForwarder = await ethers.getContractFactory("DexForwarderOptimism", deployer)
    } else if (net.chainId == 43113 || net.chainId == 43114) {
        DexForwarder = await ethers.getContractFactory("DexForwarderAvalanche", deployer)
    } else if (net.chainId == 65 || net.chainId == 66) {
        DexForwarder = await ethers.getContractFactory("DexForwarderOKC", deployer)
    } else {
        DexForwarder = await ethers.getContractFactory("DexForwarder", deployer)
    }

    let proxyAddr
    if (net.chainId == 43113) {
        proxyAddr = params.fuji.Proxy
    } else if (net.chainId === 43114) {
        proxyAddr = params.avalanche.Proxy
    } else if(net.chainId == 65) {
        proxyAddr = params.okcTestnet.Proxy
     }else if(net.chainId == 66) {
        proxyAddr = params.okc.Proxy
    } else if (net.chainId == 322) {
        proxyAddr = params["kcc-testnet"].Proxy
    } else if (net.chainId == 321) {
        proxyAddr = params.kcc.Proxy
    } else if (net.chainId == 338) {
        proxyAddr = params.cronosTestnet.Proxy
    } else if (net.chainId == 25) {
        proxyAddr = params.cronosMainnet.Proxy
    } else {
        let networkName = net.name == "homestead" ? "ethereum" : net.name
        proxyAddr = params[networkName].Proxy
        nativeToken = params[networkName].nativeToken
    }
    // console.log("force importing")
    // await upgrades.forceImport(
    //     "0xb43d4A02aFddFA9c4a9075eEcacea0a60c32C4f4",
    //     await ethers.getContractFactory("DexForwarderOptimismOld")
    // )

    console.log("Upgrading Proxy:", proxyAddr)
    let proxy = await upgrades.upgradeProxy(
        proxyAddr,
        DexForwarder,
        {
            call: {
                fn: "postUpgrade",

            }
        }
    )

    const implementation = await getImplementationAddress(ethers.provider, proxyAddr)
    console.log("Implementation", implementation)

    console.log("Waiting for confirmations...")
    await proxy.deployTransaction.wait(12) //waiting for etherscan to catchup before verification

    console.log("Verifing...")
    await run("verify:verify", {
        address: implementation,
        constructorArguments: [],
    });

}

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});