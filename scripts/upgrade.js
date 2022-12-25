const { upgrades, ethers, run } = require("hardhat");
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

let params = require("../parameters")

const main = async () => {
    const [deployer] = await ethers.getSigners()

    let net = await ethers.provider.getNetwork()
    let DexForwarder
    if (net.chainId == 420 || net.chainId == 10) { //optimism and optimism goerli
        DexForwarder = await ethers.getContractFactory("DexForwarderOptimism", deployer)
    } else {
        DexForwarder = await ethers.getContractFactory("DexForwarder", deployer)
    }

    let proxyAddr
    if (net.chainId == 43113) {
        proxyAddr = params.fuji.Proxy
    } else if (net.chainId === 43114) {
        proxyAddr = params.avalanche.Proxy
    } else {
        let networkName = net.name == "homestead" ? "ethereum" : net.name
        proxyAddr = params[networkName].Proxy
    }
    console.log("Upgrading Proxy:", proxyAddr)
    let proxy = await upgrades.upgradeProxy(
        proxyAddr,
        DexForwarder,
        {
            call: "postUpgrade"
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