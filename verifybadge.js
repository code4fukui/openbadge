import { JWS } from "https://code4fukui.github.io/JWS/JWS.js";

const jws = JSON.parse(await Deno.readTextFile("signedbadge.json"));
console.log(jws)
const data = JWS.decode(jws);
console.log(data);
