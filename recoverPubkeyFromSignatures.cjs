let elliptic = require("elliptic");
let ec = new elliptic.ec("secp256k1");
let BN = require("bn.js");

// hello
const sigRaw = {
  r: {
    curve: "secp256k1",
    scalar: [
      247, 64, 179, 61, 87, 30, 200, 144, 71, 143, 209, 207, 74, 220, 49, 28,
      187, 187, 198, 208, 114, 175, 178, 139, 60, 26, 33, 238, 187, 162, 168,
      167,
    ],
  },
  s: {
    curve: "secp256k1",
    scalar: [
      121, 27, 184, 36, 65, 158, 251, 177, 93, 95, 2, 218, 214, 118, 43, 150,
      98, 242, 90, 0, 126, 3, 150, 149, 195, 216, 146, 163, 116, 13, 100, 120,
    ],
  },
  recid: 1,
};
const sig = {
  r: new BN(Buffer.from(sigRaw.r.scalar).toString("hex"), 16),
  s: new BN(Buffer.from(sigRaw.s.scalar).toString("hex"), 16),
};

const msg = "hello";
const msgHex = Buffer.from(msg).toString('hex');
const recoveredPubKey = ec.recoverPubKey(
  Buffer.from(msgHex, 'hex'),
  sig,
  sigRaw.recid
);

console.log(
  "recovered public key from signature 1: ",
  recoveredPubKey.encode("hex")
);

console.log(ec.keyFromPublic(recoveredPubKey).getPublic(true, 'hex'));

// hello2
const sigRaw2 = {
  r: {
    curve: "secp256k1",
    scalar: [
      185, 243, 37, 242, 115, 103, 254, 30, 168, 226, 167, 29, 100, 115, 89,
      138, 101, 210, 62, 191, 107, 113, 161, 100, 107, 127, 93, 29, 38, 129,
      234, 182,
    ],
  },
  s: {
    curve: "secp256k1",
    scalar: [
      92, 251, 211, 12, 192, 183, 53, 150, 41, 130, 216, 234, 130, 31, 68, 254,
      86, 32, 78, 171, 124, 237, 32, 171, 140, 0, 154, 249, 178, 1, 220, 120,
    ],
  },
  recid: 1,
};

const msg2 = "hello1";
const msg2Hex = Buffer.from(msg2).toString('hex');

const sig2 = {
  r: new BN(Buffer.from(sigRaw2.r.scalar).toString("hex"), 16),
  s: new BN(Buffer.from(sigRaw2.s.scalar).toString("hex"), 16),
};

const recoveredPubKey2 = ec.recoverPubKey(
  Buffer.from(msg2Hex, 'hex'),
  sig2,
  sigRaw2.recid,
  "hex"
);

console.log(
  "recovered public key from signature 2: ",
  recoveredPubKey2.encode("hex")
);

console.log(ec.keyFromPublic(recoveredPubKey2).getPublic(true, 'hex'));

const y_sum = [
  2, 105, 56, 31, 30, 34, 155, 165, 65, 238, 163, 12, 224, 138, 193, 138, 163,
  33, 108, 184, 199, 29, 146, 179, 134, 203, 218, 180, 48, 140, 69, 88, 38,
];

console.log(Buffer.from(y_sum).toString('hex'));
