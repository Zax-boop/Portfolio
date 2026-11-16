import { NextResponse } from "next/server";
import { getSpotifyAccessToken, isSpotifyConfigured } from "@/lib/spotifyAuth";

interface SpotifyRecentlyPlayedResponse {
  items?: Array<{
    played_at: string;
    track: {
      id: string;
      name: string;
      artists: Array<{ name: string }>;
      album: {
        name: string;
        images: Array<{ url: string }>;
      };
      external_urls: {
        spotify: string;
      };
    };
  }>;
}

export async function GET() {
  if (!isSpotifyConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let accessToken: string;
  try {
    accessToken = await getSpotifyAccessToken();
  } catch {
    return NextResponse.json({ error: "spotify_auth_failed" }, { status: 502 });
  }

  let historyResponse: Response;
  try {
    historyResponse = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );
  } catch {
    return NextResponse.json({ error: "spotify_unavailable" }, { status: 502 });
  }

  if (!historyResponse.ok) {
    return NextResponse.json({ error: "spotify_history_unavailable" }, { status: 502 });
  }

  const history: SpotifyRecentlyPlayedResponse = await historyResponse.json();
  const tracks = (history.items ?? []).map(({ played_at, track }) => ({
    id: track.id,
    name: track.name,
    artists: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    image: track.album.images[0]?.url ?? "",
    url: track.external_urls.spotify,
    playedAt: played_at,
  }));

  return NextResponse.json({ tracks }, {
    headers: { "Cache-Control": "no-store" },
  });
}
