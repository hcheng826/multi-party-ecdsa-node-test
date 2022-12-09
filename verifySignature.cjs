let elliptic = require("elliptic");
let ec = new elliptic.ec("secp256k1");
const { y_sum_s } = require("./const.cjs");

const compressed = Buffer.from(y_sum_s).toString("hex");
const pubKey = Buffer.from(compressed, "hex");
const pk = ec.keyFromPublic(pubKey);

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
  r: Buffer.from(sigRaw.r.scalar).toString("hex"),
  s: Buffer.from(sigRaw.s.scalar).toString("hex"),
};

const msg = "hello";
const msgHex = Buffer.from(msg).toString("hex");
const result = pk.verify(Buffer.from(msgHex, "hex"), sig);
console.log(result);
