import { Base64 } from "https://js.sabae.cc/Base64.js";
import { bin2s, bin2i, subbin, setbin, i2bin, s2bin, eqbin } from "https://js.sabae.cc/binutil.js";
//import { Ed25519 } from "https://code4fukui.github.io/Ed25519/Ed25519.js";

const BEGIN = "-----BEGIN OPENSSH PRIVATE KEY-----";
const END = "-----END OPENSSH PRIVATE KEY-----";

const BEGIN2 = "-----BEGIN PRIVATE KEY-----";
const END2 = "-----END PRIVATE KEY-----";
const HEAD2 = new Uint8Array([0x30, 0x2e, 0x02, 0x01, 0x00, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x04, 0x22]);

const BEGIN3 = "-----BEGIN PUBLIC KEY-----";
const END3 = "-----END PUBLIC KEY-----";
const HEAD3 = new Uint8Array([0x30, 0x2a, 0x30, 0x05, 0x06, 0x03, 0x2b, 0x65, 0x70, 0x03, 0x21, 0x00]);

export class PEMFile {
  static decode(txt) {
    const ss = txt.split("\n").map(s => s.trim());
    const ns = ss.indexOf(BEGIN);
    const ne = ss.indexOf(END);
    if (ns < 0 || ne < 0 || ns > ne) {
      return PEMFile.decode2(txt);
    }
    const bin = Base64.decode(ss.slice(ns + 1, ne).join(""));
    console.log(new TextDecoder().decode(bin))
    for (let i = 0; i < bin.length; i++) {
      console.log(i, bin[i])
    }
    if (bin2s(bin, 0x2f, 11) != "ssh-ed25519") {
      throw new Error("is not ssh-ed25519")
    }
    if (bin2s(bin, 0x6e, 11) != "ssh-ed25519") {
      throw new Error("is not ssh-ed25519")
    }
    if (bin2i(bin, 0x3a) != 32) {
      return null;
    }
    const publicKey = subbin(bin, 0x3e, 32);
    if (bin2i(bin, 0x9d) != 64) {
      return null;
    }
    const privateKey = subbin(bin, 0xa1, 64);
    return { publicKey, privateKey };
  }
  static encode(keys) {
    if (keys instanceof Uint8Array) {
      return PEMFile.encode3(keys);
    }
    const pubkey = keys.publicKey;
    const prikey = keys.privateKey;
    const bin = new Uint8Array(234);
    s2bin(bin, 0, "openssh-key-v1\0");
    i2bin(bin, 0xf, 4);
    s2bin(bin, 0x13, "none");
    i2bin(bin, 0x17, 4);
    s2bin(bin, 0x1b, "none");
    i2bin(bin, 0x1f, 0);
    i2bin(bin, 0x23, 1);
    i2bin(bin, 0x27, 0x33);
    i2bin(bin, 0x2b, 0xb);
    s2bin(bin, 0x2f, "ssh-ed25519");
    i2bin(bin, 0x3a, 32);
    setbin(bin, 0x3e, pubkey);
    i2bin(bin, 0x5e, 0x88);
    const rnd = (Math.random() * 0x100000000) >> 0;
    i2bin(bin, 0x62, rnd);
    i2bin(bin, 0x62 + 4, rnd);
    i2bin(bin, 0x6a, 0xb);
    s2bin(bin, 0x6e, "ssh-ed25519");
    i2bin(bin, 0x79, 32);
    setbin(bin, 0x7d, pubkey);
    i2bin(bin, 0x9d, 0x40);
    setbin(bin, 0xa1, prikey);
    setbin(bin, 0xc1, pubkey);
    i2bin(bin, 0xe1, 0);
    setbin(bin, 0xe5, new Uint8Array([1, 2, 3, 4, 5]));
    const cr = "\n";
    return [BEGIN, Base64.encode(bin).replace(/(.{70})/g, "$1" + cr), END].join(cr) + cr;
  }
  static decode2(txt) {
    const ss = txt.split("\n").map(s => s.trim());
    const ns = ss.indexOf(BEGIN2);
    const ne = ss.indexOf(END2);
    if (ns < 0 || ne < 0 || ns > ne) {
      return PEMFile.decode3(txt);
    }
    const bin = Base64.decode(ss.slice(ns + 1, ne).join(""));
    const chk = HEAD2;
    if (eqbin(subbin(bin, 0, chk.length), chk)) {
      const privateKey = subbin(bin, 0x10, 32);
      //const publicKey = Ed25519.publicKeyFromPrivateKey({ privateKey });
      return { privateKey };
    }
    throw new Error("not supported PEM file");
  }
  static decode3(txt) {
    const ss = txt.split("\n").map(s => s.trim());
    const ns = ss.indexOf(BEGIN3);
    const ne = ss.indexOf(END3);
    if (ns < 0 || ne < 0 || ns > ne) {
      throw new Error("is not PEM file");
    }
    const bin = Base64.decode(ss.slice(ns + 1, ne).join(""));
    const chk2 = HEAD3;
    if (eqbin(subbin(bin, 0, chk2.length), chk2)) {
      const publicKey = subbin(bin, 12, 32);
      return { publicKey };
    }
    throw new Error("not supported PEM file");
  }
  static encode3(publicKey) {
    console.log(publicKey);
    const bin = new Uint8Array(32 + 12);
    setbin(bin, 0, HEAD3);
    setbin(bin, 12, publicKey);
    const cr = "\n";
    return [BEGIN3, Base64.encode(bin).replace(/(.{70})/g, "$1" + cr), END3].join(cr) + cr;
  }
}
