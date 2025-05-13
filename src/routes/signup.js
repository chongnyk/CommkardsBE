const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const cognito = new AWS.CognitoIdentityServiceProvider();

router.post("/", async (req, res) => {
  const { username, password, email, birthdate } = req.body;
  try {
    await cognito.signUp({
      ClientId: process.env.CLIENT_ID,
      Username: username,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: 'birthdate', Value: birthdate },
    ],
    }).promise();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
