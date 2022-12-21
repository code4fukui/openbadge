import { JWS } from "https://code4fukui.github.io/JWS/JWS.js";
import { PEMFile } from "./PEMFile.js";
//import { CBOR } from "https://js.sabae.cc/CBOR.js";


const pem1 = await Deno.readTextFile("prikey.pem");
const keys = PEMFile.decode(pem1);
const pem2 = await Deno.readTextFile("pubkey.pem");
const keys2 = PEMFile.decode(pem2);
keys.publicKey = keys2.publicKey;
console.log(keys);

//const keys = CBOR.decode(await Deno.readFile("keypair.cbor"));

const publicKeyPem = PEMFile.encode(keys.publicKey).replace(/\n/g, "\\n");
//console.log(publicKeyPem);

const data = JSON.parse(await Deno.readTextFile("unsignedbadge.json"));
data.verification.creator = {
  "type": "CryptographicKey",
  publicKeyPem,
};
const data2 = { iat: 1671659969, exp: 1706219969, iss: "fukuno.jig.jp" };

const jws = JWS.encode(data, keys);
//const jws = JWS.encode(data2, keys);
await Deno.writeTextFile("signedbadge.json", JSON.stringify(jws, null, 2));
