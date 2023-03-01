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
  } else {
    DexForwarder = await ethers.getContractFactory("DexForwarder", deployer)
  }

  console.log("Deploying to network:", net.name, net.chainId)
  let routerAddress
  let trustedForwarder
  let nativeWrappedToken

  if (net.chainId == 43113) {
    routerAddress = params.fuji.routerAddr
    trustedForwarder = params.fuji.trustedForwarder
  } else if (net.chainId == 322) {
    routerAddress = params["kcc-testnet"].routerAddr
    trustedForwarder = params["kcc-testnet"].trustedForwarder
    nativeWrappedToken = params["kcc-testnet"].nativeWrappedToken
  } else if (net.chainId == 321) {
    routerAddress = params.kcc.routerAddr
    trustedForwarder = params.kcc.trustedForwarder
    nativeWrappedToken = params.kcc.nativeWrappedToken
  } else {
    let networkName = net.name == "homestead" ? "ethereum" : net.name
    routerAddress = params[networkName].routerAddr
    trustedForwarder = params[networkName].trustedForwarder
  }

  console.log("Deploying Impl and Proxy")

  const dexForwarder = await upgrades.deployProxy(DexForwarder, [
    routerAddress, trustedForwarder, nativeWrappedToken
  ])

  await dexForwarder.deployed()

  const implementation = await getImplementationAddress(ethers.provider, dexForwarder.address)

  console.log("Implementation", implementation)
  console.log("Proxy: ", dexForwarder.address)

  console.log("Waiting for confirmations...")
  await dexForwarder.deployTransaction.wait(12) //waiting for etherscan to catchup before verification

  console.log("Verifying...")

  await run("verify:verify", {
    address: implementation,
    constructorArguments: [],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
