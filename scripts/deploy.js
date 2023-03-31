// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { upgrades, ethers, run } = require("hardhat");
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');

// const routerAddress = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
// const trustedForwarder = "0xE041608922d06a4F26C0d4c27d8bCD01daf1f792"
let params = require("../parameters")

async function main() {
  const [deployer] = await ethers.getSigners()

  let DexForwarder

  let net = await ethers.provider.getNetwork()

  if (net.chainId == 420 || net.chainId == 10) { //optimism and optimism goerli
    DexForwarder = await ethers.getContractFactory("DexForwarderOptimism", deployer)
  } else if (net.chainId == 43113 || net.chainId == 43114) {
    DexForwarder = await ethers.getContractFactory("DexForwarderAvalanche", deployer)
  } else if (net.chainId == 65 || net.chainId == 66) {
    DexForwarder = await ethers.getContractFactory("DexForwarderOKC", deployer)
  } else {
    DexForwarder = await ethers.getContractFactory("DexForwarder", deployer)
  }

  console.log("Deploying to network:", net.name, net.chainId)
  let routerAddress
  let trustedForwarder
  let nativeTokenAddress
  let networkName
  if (net.chainId == 43113) {
    routerAddress = params.fuji.routerAddr
    trustedForwarder = params.fuji.trustedForwarder
  } else if (net.chainId == 322) {
    routerAddress = params["kcc-testnet"].routerAddr
    trustedForwarder = params["kcc-testnet"].trustedForwarder
    nativeTokenAddress = params["kcc-testnet"].nativeWrappedToken
  } else if (net.chainId == 321) {
    routerAddress = params.kcc.routerAddr
    trustedForwarder = params.kcc.trustedForwarder
    nativeTokenAddress = params.kcc.nativeWrappedToken
  } else if (net.chainId == 338) { //cronost testnet
    routerAddress = params.cronosTestnet.routerAddr
    trustedForwarder = params.cronosTestnet.trustedForwarder
    nativeTokenAddress = params.cronosTestnet.nativeTokenAddress
  } else if (net.chainId == 25) { //cronos mainnet
    routerAddress = params.cronosMainnet.routerAddr
    trustedForwarder = params.cronosMainnet.trustedForwarder
    nativeTokenAddress = params.cronosMainnet.nativeTokenAddress
    nativeToken = params["fuji"].nativeToken
  } else if(net.chainId == 65) {
    routerAddress = params.okcTestnet.routerAddr
    trustedForwarder = params.okcTestnet.trustedForwarder
    nativeTokenAddress = params.okcTestnet.nativeToken
  } else if(net.chainId == 66) {
    routerAddress = params.okc.routerAddr
    trustedForwarder = params.okc.trustedForwarder
    nativeTokenAddress = params.okc.nativeToken
  } else if(net.chainId == 71) {
    networkName = "conflux-testnet"
    routerAddress = params.confluxTestnet.routerAddr // Conflux Testnet
    trustedForwarder = params.confluxTestnet.trustedForwarder
    nativeTokenAddress = params.confluxTestnet.nativeToken // Wrapped CFX
  } else if(net.chainId == 1030) {
    networkName = "conflux"
    routerAddress = params.conflux.routerAddr // Conflux Mainnet
    trustedForwarder = params.conflux.trustedForwarder
    nativeTokenAddress = params.conflux.nativeToken // Wrapped CFX
  } else {
    networkName = net.name == "homestead" ? "ethereum" : net.name
    routerAddress = params[networkName].routerAddr
    trustedForwarder = params[networkName].trustedForwarder
    nativeToken = params[networkName].nativeToken
  }

  console.log("Deploying Impl and Proxy")

  const dexForwarder = await upgrades.deployProxy(DexForwarder, [
    routerAddress, trustedForwarder, nativeTokenAddress
  ])

  await dexForwarder.deployed()

  const implementation = await getImplementationAddress(ethers.provider, dexForwarder.address)

  console.log("Implementation", implementation)
  console.log("Proxy: ", dexForwarder.address)

  if(net.chainId != 65 && net.chainId != 66) { //okc testnet and okc mainnet doesn't have etherscan like explorers
    console.log("Waiting for confirmations...")
    await dexForwarder.deployTransaction.wait(12) //waiting for etherscan to catchup before verification
  
    console.log("Verifing...")
  
    await run("verify:verify", {
      address: implementation,
      constructorArguments: [],
    });
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
