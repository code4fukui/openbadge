//import { PEMFile } from "https://code4fukui.github.io/Ed25519/PEMFile.js";
import { PEMFile } from "./PEMFile.js";

const pem1 = await Deno.readTextFile("prikey.pem");
console.log(pem1)
const keys1 = PEMFile.decode(pem1);
console.log(keys1);

const pem = await Deno.readTextFile("pubkey.pem");
console.log(pem)
const keys = PEMFile.decode(pem);
console.log(keys);

const pem2 = PEMFile.encode(keys.publicKey);
console.log(pem2);
