const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const cognito = new AWS.CognitoIdentityServiceProvider();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const data = await cognito.initiateAuth({
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: process.env.CLIENT_ID,
      AuthParameters: { USERNAME: username, PASSWORD: password },
    }).promise();
    res.json({
      message: "Login successful",
      token: data.AuthenticationResult.IdToken,
      refreshToken: data.AuthenticationResult.RefreshToken,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
