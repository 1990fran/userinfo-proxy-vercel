import axios from 'axios';

export default async function handler(req, res) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    const response = await axios.get('https://dev-f7q4qmy5zahp17uf.us.auth0.com/userinfo', {
      headers: { Authorization: authorization },
    });
    return res.status(200).json(response.data);
  } catch {
    return res.status(500).json({ error: 'Failed to fetch userinfo' });
  }
}
