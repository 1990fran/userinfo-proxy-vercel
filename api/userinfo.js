// api/userinfo.js
import axios from 'axios';

export default async function handler(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    const response = await axios.get('https://auth.nyu.edu/oauth2/userinfo', {
      headers: { Authorization: authorization },
    });

    const original = response.data;
    console.log('Original userinfo:', original);
    const transformed = {
      sub: original.sub,
      email: original.email,
      email_verified: true,
      given_name: original.firstname || original.given_name || '',
      family_name: original.lastname || original.family_name || '',
      name: `${original.firstname || ''} ${original.lastname || ''}`.trim(),
      preferred_username: original.sub,
      picture: original.picture || null,
    };

    return res.status(200).json(transformed);
  } catch (error) {
    console.error('Error fetching userinfo:', error.message);
    return res.status(500).json({ error: 'Failed to fetch userinfo' });
  }
}
