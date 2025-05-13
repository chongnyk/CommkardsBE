const serverless = require("serverless-http");
const app = require("./app");

require('dotenv').config();

// Now you can access the environment variables like this:
const userPoolId = process.env.USER_POOL_ID;
const clientId = process.env.CLIENT_ID;
const region = process.env.REGION;
const tableName = process.env.TABLE_NAME;

module.exports.handler = serverless(app);
