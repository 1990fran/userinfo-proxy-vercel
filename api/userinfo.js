import axios from 'axios';

export default async function handler(req, res) {
  console.log('⏳ Incoming request to /api/userinfo');
  const auth = req.headers.authorization;
  console.log('Authorization header:', auth);

  if (!auth) {
    console.log('❌ No Authorization header');
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    const { data } = await axios.get(
      'https://dev-f7q4qmy5zahp17uf.us.auth0.com/userinfo',
      { headers: { Authorization: auth } }
    );
    console.log('✅ Received userinfo from IdP:', data);
    return res.status(200).json(data);
  } catch (err) {
    console.error('🚨 Error fetching userinfo:', err.message);
    return res.status(500).json({ error: 'Failed to fetch userinfo' });
  }
}
