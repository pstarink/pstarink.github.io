# Environment variables

[Link](https://nodejs.dev/en/learn/how-to-read-environment-variables-from-nodejs/)

Add the `dotenv` package to the project

```bash
npm install --save "dotenv"
```

Create the `.env` file, e.g.

```javascript
PORT = "5500";
```

In the file, require the package and call `config()` to parse the variables:

```javascript
require("dotenv").config();
const PORT = process.env.PORT || "3000";
```

Note that the require needs to be called only once, likely from the `index.js` file.

# JWT

[Link 1](https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/)

[Link 2](https://dev.to/cyberwolves/node-js-api-authentication-with-jwt-json-web-token-auth-middleware-ggm)
