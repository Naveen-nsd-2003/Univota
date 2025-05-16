/*const hre = require("hardhat");

async function main() {
  const Lock = await hre.ethers.getContractFactory("Lock");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log("Lock with 1 ETH deployed to:", lock.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
*/







//import { ethers } from "hardhat";
const hre = require("hardhat");

async function main() {
  const Create = await ethers.getContractFactory("Create");
  const create = await Create.deploy();

  await create.deployed();

  console.log("✅ Voting contract deployed at:", create.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 



