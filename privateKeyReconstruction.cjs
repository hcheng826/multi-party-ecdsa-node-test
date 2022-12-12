const BN = require("bn.js");
let elliptic = require("elliptic");
let ec = new elliptic.ec("secp256k1");

// copy the x_i from the local-share.json of a (t, n) = (1, 3) gg20 key sharing

const x1 = [
  165, 15, 167, 143, 109, 45, 239, 89, 72, 99, 74, 0, 143, 235, 85, 243, 102,
  49, 199, 155, 243, 1, 39, 205, 98, 240, 16, 22, 203, 164, 236, 33,
];

const x2 = [
  186, 35, 129, 17, 144, 123, 10, 163, 90, 27, 155, 27, 96, 27, 20, 105, 140,
  223, 109, 246, 99, 157, 170, 148, 27, 0, 225, 21, 238, 148, 128, 198,
];

// not used
const x3 = [
  207, 55, 90, 147, 179, 200, 37, 237, 107, 211, 236, 54, 48, 74, 210, 223, 179,
  141, 20, 80, 212, 58, 45, 90, 211, 17, 178, 21, 17, 132, 21, 107,
];

const y_sum_s = [
  2, 105, 56, 31, 30, 34, 155, 165, 65, 238, 163, 12, 224, 138, 193, 138, 163,
  33, 108, 184, 199, 29, 146, 179, 134, 203, 218, 180, 48, 140, 69, 88, 38,
];

// Let the polynomials: f(x) = ax + b (t = 1, so it's a degree 1 polynomial, 2 shares is enough to recontruct the private key), b would be the private key
const bn1 = new BN(Buffer.from(x1)); // f(1) = a + b
const bn2 = new BN(Buffer.from(x2)); // f(2) = 2a + b

const b = bn1.add(bn1).sub(bn2); // solve for b

const key = ec.keyFromPrivate(b);
console.log("Pub key from reconstructed private key:", key.getPublic(true, "hex"));

console.log("Actual pub key: ", Buffer.from(y_sum_s).toString("hex"));
