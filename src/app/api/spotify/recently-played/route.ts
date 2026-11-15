import { NextResponse } from "next/server";

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
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let tokenResponse: Response;
  try {
    tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
      cache: "no-store",
    });
  } catch {
    return NextResponse.json({ error: "spotify_unavailable" }, { status: 502 });
  }

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: "spotify_auth_failed" }, { status: 502 });
  }

  const tokenData = await tokenResponse.json();
  if (typeof tokenData.access_token !== "string") {
    return NextResponse.json({ error: "spotify_auth_failed" }, { status: 502 });
  }

  let historyResponse: Response;
  try {
    historyResponse = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=5",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
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
