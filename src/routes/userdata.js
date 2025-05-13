const express = require("express");
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const router = express.Router();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

router.get("/", async (req, res) => {
  const auth = req.headers.authorization?.split(" ")[1];
  if (!auth) return res.status(401).json({ error: "No token provided" });

  const decoded = jwt.decode(auth);
  if (!decoded?.sub) return res.status(401).json({ error: "Invalid token" });

  try {
    const data = await dynamoDB
      .get({ TableName: process.env.USERS_TABLE, Key: { id: decoded.sub } })
      .promise();
    if (!data.Item) return res.status(404).json({ error: "User not found" });
    res.json(data.Item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
