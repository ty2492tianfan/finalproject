const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x35DF495f42b804Fa8a36ceEf9EDE27DA1Ad8169F";

  const issuerAddress = "0x263a2F312609f2AfcDA51C7f1BC1F72827e733c5"; 

  const diplomaNFT = await ethers.getContractAt("DiplomaNFT", contractAddress);

  console.log(`🔑 Approving issuer: ${issuerAddress}...`);
  const tx = await diplomaNFT.approveIssuer(issuerAddress);
  await tx.wait();

  console.log(`✅ Successfully approved issuer: ${issuerAddress}`);
}

main().catch((error) => {
  console.error("❌ Error approving issuer:", error);
  process.exit(1);
});
