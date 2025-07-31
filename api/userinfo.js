import axios from 'axios';

export default async function handler(req, res) {
  console.log('⏳ Incoming request to /api/userinfo');
  const auth = req.headers.authorization;
  console.log('Authorization header:', auth);

  if (!auth) {
    console.log('❌ No Authorization header');
    return res.status(401).json({ error: 'Missing Authorization header' });
  }
 //https://auth.nyu.edu/oauth2/userinfo
 //https://dev-f7q4qmy5zahp17uf.us.auth0.com/userinfo 
  try {
    const { data } = await axios.get(
      'https://dev-f7q4qmy5zahp17uf.us.auth0.com/userinfo',
      { headers: { Authorization: auth } }
    );
    
    console.log('✅ Received userinfo from IdP:', data);

    // Transformar respuesta para Clerk
    const transformed = {
      sub: data.sub,
      email: data.email ,
      email_verified: data.email_verified ?? true,
      name: data.firstname || `${data.given_name || ''} ${data.family_name || ''}`.trim(),
    };

    console.log('📦 Transformed userinfo:', transformed);

    return res.status(200).json(transformed);
  } catch (err) {
    console.error('🚨 Error fetching userinfo:', err.message);
    return res.status(500).json({ error: 'Failed to fetch userinfo' });
  }
}
