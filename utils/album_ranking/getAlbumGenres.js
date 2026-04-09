export async function getAlbumGenres(artist, album) {
  try {
    const res = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=album.getInfo&artist=${encodeURIComponent(
        artist
      )}&album=${encodeURIComponent(album)}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&format=json`
    );

    const data = await res.json();

    const tags = data.album?.tags?.tag;

    if (!tags) return [];

    return tags.map((t) => t.name);
  } catch (err) {
    console.error("Error fetching genres:", err);
    return [];
  }
}