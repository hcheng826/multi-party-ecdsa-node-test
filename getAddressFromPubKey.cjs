const { y_sum_s } = require("./const.cjs");
const ethers = require("ethers");

console.log(
  "address: ",
  ethers.utils.computeAddress("0x" + Buffer.from(y_sum_s).toString("hex"))
);
