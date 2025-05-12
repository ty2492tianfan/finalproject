const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const DiplomaNFT = await hre.ethers.getContractFactory("DiplomaNFT");

  
  const contract = await DiplomaNFT.deploy(deployer.address);

  await contract.waitForDeployment();

  console.log("✅ DiplomaNFT deployed to:", contract.target); 
}

main().catch((error) => {
  console.error("❌ Deployment failed:", error);
  process.exitCode = 1;
});
