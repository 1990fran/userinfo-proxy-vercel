import axios from 'axios';

export default async function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'Missing Authorization header' });

  try {
    const { data } = await axios.get(
      'https://dev-f7q4qmy5zahp17uf.us.auth0.com/userinfo',
      { headers: { Authorization: auth } }
    );
    return res.status(200).json(data);
  } catch (err) {
    console.error('proxy error', err);
    return res.status(500).json({ error: 'Failed to fetch userinfo' });
  }
}
