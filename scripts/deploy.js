// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { upgrades, ethers, run } = require("hardhat");
// const routerAddress = "0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506"
// const trustedForwarder = "0xE041608922d06a4F26C0d4c27d8bCD01daf1f792"
let params = require("../parameters")

async function main() {
  const [deployer] = await ethers.getSigners()

  let DexForwarder = await ethers.getContractFactory("DexForwarder", deployer)

  let net = await ethers.provider.getNetwork()
  console.log("Deploying to network:", net.name)
  let networkName = net.name == "homestead" ? "ethereum" : net.name
  const routerAddress = params[networkName].routerAddr
  const trustedForwarder = params[networkName].trustedForwarder

  console.log("Deploying Impl and Proxy")

  const dexForwarder = await upgrades.deployProxy(DexForwarder, [
    routerAddress, trustedForwarder
  ])

  await dexForwarder.deployed()

  console.log("Waiting for confirmations...")
  await dexForwarder.deployTransaction.wait(6) //waiting for etherscan to catchup before verification


  let implementation = await ethers.provider.send("eth_getStorageAt", [
    dexForwarder.address,
    "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc" //keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
  ])

  implementation = '0x' + implementation.slice(26)

  console.log("Implementation", implementation)
  console.log("Proxy: ", dexForwarder.address)

  console.log("Verifing...")

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
