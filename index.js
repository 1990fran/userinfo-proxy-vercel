const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Configura tus datos del IdP original (NYU)
const REAL_USERINFO_URL = 'https://dev-f7q4qmy5zahp17uf.us.auth0.com/userinfo';

app.get('/userinfo', (req, res) => {
  res.json({
    sub: 'testuser',
    email: 'user@example.com',
    email_verified: true,
    given_name: 'Test',
    family_name: 'User',
    name: 'Test User',
    preferred_username: 'testuser'
  });
});

app.listen(port, () => {
  console.log(`UserInfo proxy listening on http://localhost:${port}`);
});

