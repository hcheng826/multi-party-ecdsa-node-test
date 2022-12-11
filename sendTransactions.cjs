const ethers = require("ethers");
const { keccak256 } = require("@ethersproject/keccak256");
const { resolveProperties } = require("@ethersproject/properties");
const { serialize } = require("@ethersproject/transactions");
const { splitSignature, hexZeroPad } = require("@ethersproject/bytes");

const main = async () => {
  // observe from existing tx
  const txHex =
    "0x02f8d7058084010132418401013241830927c094c24215226336d22238a20a72f8e489c005b44c4a8703837d81aed000b8648340f54900000000000000000000000022c85b3c36b41b2338ce10f89b36c5a556ad44d600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003837d81aed000c080a02b8be4cff2cfe09e04df27a1b902353ecc01c0b03b061b60322d8d5faa4315f8a0583a0241a10f0a54e5054b638098f45739546374dba2fa47e4b3030b20776906";
  const parsedTx = ethers.utils.parseTransaction(txHex);
  // console.log(parsedTx);

  const tinyValueToSend = 1;
  const tx = {
    type: 2,
    chainId: 5,
    nonce: 1,
    maxPriorityFeePerGas: "0xf1013241",
    maxFeePerGas: "0xf1013241",
    gasLimit: "0x0927c0",
    to: "0xA28B81e10d78a38A9C1D4dD599145355577354f6",
    // to: "0x18557707F48365373bC639F807A919dDbdbd3B6A",
    value: "0x" + tinyValueToSend.toString(16),
  };

  const resolvedTx = await resolveProperties(tx);
  const serializedTx = ethers.utils.serializeTransaction(tx);
  const parsedTx2 = ethers.utils.parseTransaction(serializedTx);
  console.log(
    "hashed serializedTx: (use multi-party-ecdsa to sign this)",
    keccak256(serializedTx)
  );

  // replace the sigature from multi-party-ecdsa
  const sigature = {
    r: {
      curve: "secp256k1",
      scalar: [
        35, 234, 37, 143, 240, 78, 143, 2, 51, 71, 128, 1, 176, 103, 91, 199,
        20, 45, 246, 38, 196, 255, 192, 105, 255, 26, 244, 32, 144, 131, 31,
        212,
      ],
    },
    s: {
      curve: "secp256k1",
      scalar: [
        37, 163, 224, 171, 253, 192, 125, 39, 210, 19, 221, 96, 221, 51, 221,
        143, 246, 208, 145, 133, 136, 65, 73, 162, 81, 221, 126, 207, 203, 176,
        227, 28,
      ],
    },
    recid: 0,
  };

  const parsedSigature = {
    recoveryParam: sigature.recid,
    r: hexZeroPad("0x" + Buffer.from(sigature.r.scalar).toString("hex"), 32),
    s: hexZeroPad("0x" + Buffer.from(sigature.s.scalar).toString("hex"), 32),
  };

  const theSplitSignature = splitSignature(parsedSigature);
  const serializeTx = serialize(resolvedTx, theSplitSignature);

  const rpcUrl = "https://rpc.ankr.com/eth_goerli";
  // const rpcUrl = "http://localhost:8545";
  const provider = ethers.getDefaultProvider(rpcUrl);

  /** try to sign using ethers library */
  const testWallet = new ethers.Wallet(
    "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6"
  );
  const testSignedTx = await testWallet.signTransaction({
    ...parsedTx2,
    nonce: await provider.getTransactionCount(testWallet.address),
  });

  // console.log("testSignedTx:", testSignedTx);
  console.log(ethers.utils.parseTransaction(serializeTx));

  await provider.sendTransaction(serializeTx);
};

main();
