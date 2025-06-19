const { ethers, run } = require("hardhat");

async function main() {
    const blockNumber = await ethers.provider.getBlockNumber();
    console.log('blockNumber', blockNumber);
    // let implementation = await ethers.provider.send("eth_getStorageAt", [
    //     '0xD8c073bF23141Fc2B5ac852E6989097dCd09CDcD',
    //     "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc" //keccak-256 hash of "eip1967.proxy.implementation" subtracted by 1
    //   ])
    
    //   implementation = '0x' + implementation.slice(26)
    
    //   console.log("Implementation", implementation)
    //   console.log("Proxy: ", dexForwarder.address)
    
      console.log("Verifing...")
    
      await run("verify:verify", {
        address: '0x5C0dC59855a8BAf1928DB3d642d10892998b3a52',
        constructorArguments: [],
      });
      // await run("oklink-verify:verify", {
      //   address: '0x981aE6155F8CF24F67e30CA8d90ab6FaEB472aE5',
      //   constructorArguments: [],
      // });
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});