# openbadge
 
## to make keypair

```sh
openssl genpkey -algorithm ed25519 --out prikey.pem
openssl pkey -in prikey.pem -pubout > pubkey.pem
```

check binary
```sh
head -2 prikey.pem | tail -1 | base64 -D | hexdump -C
head -2 pubkey.pem | tail -1 | base64 -D | hexdump -C
```
