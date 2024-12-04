const express = require('express');
const { OAuth2Client } = require('google-auth-library');

const app = express();

// Create a client ID for your project
const client = new OAuth2Client();

// Verify token middleware
async function verifyToken(req, res, next) {
  const authorizationHeader = req.header('Authorization');
  if (!authorizationHeader) {
    return res.status(401).send('Unauthorized');
  }

  const token = authorizationHeader.replace('Bearer ', '');
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const userData = ticket.getPayload();
    req.user = userData;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send('Invalid token');
  }
}

// Protected route
app.get('/verify', verifyToken, (req, res) => {
  res.send(`Hello, ${req.user.name}!`);
});

const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});