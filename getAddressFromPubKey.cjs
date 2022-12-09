// Reference: https://programmer.ink/think/specific-process-of-ethereum-generating-address-from-public-key.html
const keccak256 = require('keccak256')
const { y_sum_s } = require("./const.cjs");
const elliptic = require("elliptic");
const ec = new elliptic.ec("secp256k1");

const pubKey = Buffer.from(y_sum_s);

// remove the prefix 04: https://github.com/indutny/elliptic/issues/86
const fullPubKey64byte = ec.keyFromPublic(pubKey).getPublic('hex').slice(2);

const address = keccak256(fullPubKey64byte).toString('hex').slice(24);
console.log(address.length);
console.log("address: ", address);
