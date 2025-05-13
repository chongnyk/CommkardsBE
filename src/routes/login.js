const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
const cognito = new AWS.CognitoIdentityServiceProvider();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Step 1: Initiate SRP Auth Flow
    const initiateAuthResponse = await cognito.initiateAuth({
      AuthFlow: "USER_SRP_AUTH",
      ClientId: process.env.CLIENT_ID,
      AuthParameters: {
        USERNAME: username,
      },
    }).promise();

    // Step 2: Get the SRP challenge parameters from the response
    const challengeParameters = initiateAuthResponse.ChallengeParameters;
    
    const challenge = {
      salt: challengeParameters.SALT,
      secretBlock: challengeParameters.SECRET_BLOCK,
      username,
    };

    // Send the challenge back to the frontend
    res.json({
      challenge,
    });

  } catch (err) {
    // If the auth initiation fails
    res.status(401).json({ error: err.message });
  }
});

module.exports = router;
