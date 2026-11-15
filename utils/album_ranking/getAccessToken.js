export async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify client credentials are not configured.');
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    },
    body: 'grant_type=client_credentials',
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error('Spotify access token request failed.');
  }

  const data = await response.json();
  if (typeof data.access_token !== 'string') {
    throw new Error('Spotify did not return an access token.');
  }

  return data.access_token;
}