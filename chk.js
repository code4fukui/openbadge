import { SHA256 } from "https://code4fukui.github.io/SHA256/SHA256.js";
import { Base16 } from "https://code4fukui.github.io/Base16/Base16.js";

const fn = "bU5IMEhEbldOaGZUZXpJYVFDcm5adz09.json";
const data = JSON.parse(await Deno.readTextFile(fn));
const id = data.recipient.identity;
const salt = data.recipient.salt;
const hash = id.split("$")[1];

const mail = "fukuno@jig.jp";
const hash2 = Base16.encode(await SHA256.digest(mail + salt));
console.log(hash2);
console.log("chk", hash == hash2);

/*
{
  "@context": "https://w3id.org/openbadges/v2",
  "type": "Assertion",
  "id": "https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2/Assertion/bU5IMEhEbldOaGZUZXpJYVFDcm5adz09",
  "badge": "https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2/BadgeClass/UFd4VzNmSDhnc1hpSHpmNWt0cVlRQT09",
  "image": "https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2/Assertion/bU5IMEhEbldOaGZUZXpJYVFDcm5adz09/image",
  "verification": { "type": "HostedBadge" },
  "issuedOn": "2022-12-16T00:00:00+09:00",
  "recipient": {
    "identity":"sha256$9c0f5d01dbfb48c8c8874bae9ae6397f2c6b80c2b467613cec4d0dcdc3072498",
    "type":"email",
    "hashed":true,
    "salt":"7be4e847099f30fa4e3b1e24c8218431"
  }
}

"verification": { "type": "SignedBadge" },


https://w3id.org/openbadges#

https://w3id.org/openbadges/v2
  ->
  https://openbadgespec.org/v2/context.json

{
  "@context":"https://w3id.org/openbadges/v2",
  "type":"Assertion",
  "badge": {
    "type":"BadgeClass",
    "name":"デジタル推進委員",
    "description":"このバッジの保有者は、デジタル推進委員であることを証明します。\nデジタル推進委員は、デジタル機器・サービスに不慣れな方等に対し、デジタル機器・サービスの利用方法等を教える・サポートする活動を行います。",
    "image":"https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2/BadgeClass/UFd4VzNmSDhnc1hpSHpmNWt0cVlRQT09/image",
    "criteria":{"narrative":"デジタル推進委員に任命された者"},
    "issuer": {
      "type":"Issuer",
      "name":"デジタル庁",
      "description":"デジタル社会形成の司令塔として、未来志向のDX（デジタル・トランスフォーメーション）を大胆に推進し、デジタル時代の官民のインフラを今後5年で一気呵成に作り上げることを目指します。\n徹底的な国民目線でのサービス創出やデータ資源の利活用、社会全体のDXの推進を通じ、全ての国民にデジタル化の恩恵が行き渡る社会を実現すべく、取組を進めてまいります。\n\nデジタル庁の組織は、戦略・組織グループ、デジタル社会共通機能グループ、国民向けサービスグループ、省庁業務サービスグループの４つのグループから構成されます。戦略・組織グループ以外のグループについては、プロジェクトを中心としたチームを組成しており、１人１人の人材の専門性（スキル）に応じて、最適なプロジェクトへのアサインメントを機動的に行う予定です。",
      "url":"https://www.digital.go.jp/",
      "email":"digi-accessibility@digital.go.jp",
      "image":"https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2/Issuer/Y3RCSStsMTA5dDNrTldFRDVpS2Jodz09/image"
    }
  },
  "image":"https://nlp.netlearning.co.jp/api/v1.0/openbadge/v2/Assertion/bU5IMEhEbldOaGZUZXpJYVFDcm5adz09/image",
  "verification":{
    "type":"SignedBadge"
    "creator": {
      "type": "CryptographicKey",
      "id": "https://example.org/publicKey.json",
      "owner": "https://example.org/organization.json",
      "publicKeyPem": "-----BEGIN PUBLIC KEY-----\nMIIBG0BA...OClDQAB\n-----END PUBLIC KEY-----\n"
    }
  },
  "issuedOn":"2022-12-16T00:00:00+09:00",
  "recipient":{"identity":"sha256$9c0f5d01dbfb48c8c8874bae9ae6397f2c6b80c2b467613cec4d0dcdc3072498","type":"email","hashed":true,"salt":"7be4e847099f30fa4e3b1e24c8218431"}
}

recipient で、公開鍵を設定したい
  schema.orgにpublicKeyがない

{
  "@context": "https://w3id.org/openbadges/v2",

}

*/
