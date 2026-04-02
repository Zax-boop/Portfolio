import { getAccessToken } from './getAccessToken.js';

export async function getAlbumInfo(albumId) {
  const token = await getAccessToken();

  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return await res.json();
}