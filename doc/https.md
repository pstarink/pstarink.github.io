# Serve over https

[Create CA](https://deliciousbrains.com/ssl-certificate-authority-for-local-https-development/)

HTTPS [Angular](https://betterprogramming.pub/how-to-serve-your-angular-application-over-https-using-ng-serve-240e2c2e0a5d)

[Express](https://flaviocopes.com/express-https-self-signed-certificate/)

Create your own Certificate Authority (CA). First create the directory for the certs:

```bash
mkdir ~/certs
cd ~/certs
```

Create the CA key and pem:

```bash
openssl genrsa -des3 -out myCA.key 2048
openssl req -x509 -new -nodes -key myCA.key -sha256 -days 1825 -out myCA.pem
```

Add to the trusted certs:

```bash
sudo security add-trusted-cert -d -r trustRoot -k "/Library/Keychains/System.keychain" myCA.pem
```

Create the key and the csr:

```bash
openssl genrsa -out local.dev.key 2048
openssl req -new -key local.dev.key -out local.dev.csr
```

Create the file `local.dev.ext`

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = local.dev
```

Register them with the CA:

```bash
openssl x509 -req -in local.dev.csr -CA myCA.pem -CAkey myCA.key \
-CAcreateserial -out local.dev.crt -days 825 -sha256 -extfile local.dev.ext
```

For Angular, modify the `angular.json` to serve over https:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    {{PROJECT_NAME}}: {
      "architect": {
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "sslKey": "~/certs/local.dev.key",
            "sslCert": "~/certs/local.dec.crt",
            "ssl": true,
            "port": 4444
            ...
          }, ...
        }, ...
      }, ...
    }, ...
  }, ...
}
```

and serve up with `ng serve`

For Express, start the server `index.js` with

```javascript
https
    .createServer(
        {
            key: fs.readFileSync("../certs/local.dev.key"),
            cert: fs.readFileSync("../certs/local.dev.crt"),
        },
        app
    )
    .listen(PORT, () => console.log("Listening on port " + PORT));
```
