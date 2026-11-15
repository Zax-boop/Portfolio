import { NextRequest, NextResponse } from "next/server";
import { getSpotifyAccessToken, isSpotifyConfigured } from "@/lib/spotifyAuth";

interface SpotifyTopArtist {
  id: string;
  name: string;
  images?: Array<{ url: string }>;
  external_urls: { spotify: string };
}

interface SpotifyTopTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    images?: Array<{ url: string }>;
  };
  external_urls: { spotify: string };
}

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");
  const timeRange = request.nextUrl.searchParams.get("time_range") ?? "medium_term";

  if (type !== "artists" && type !== "tracks") {
    return NextResponse.json({ error: "invalid_type" }, { status: 400 });
  }

  if (!["short_term", "medium_term", "long_term"].includes(timeRange)) {
    return NextResponse.json({ error: "invalid_time_range" }, { status: 400 });
  }

  if (!isSpotifyConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let accessToken: string;
  try {
    accessToken = await getSpotifyAccessToken();
  } catch {
    return NextResponse.json({ error: "spotify_auth_failed" }, { status: 502 });
  }

  let response: Response;
  try {
    response = await fetch(
      `https://api.spotify.com/v1/me/top/${type}?time_range=${timeRange}&limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
      }
    );
  } catch {
    return NextResponse.json({ error: "spotify_unavailable" }, { status: 502 });
  }

  if (response.status === 403) {
    return NextResponse.json({ error: "spotify_scope_missing" }, { status: 403 });
  }
  if (!response.ok) {
    return NextResponse.json({ error: "spotify_top_items_unavailable" }, { status: 502 });
  }

  const data = await response.json();
  const items = (data.items ?? []).map((item: SpotifyTopArtist | SpotifyTopTrack) => {
    const isTrack = type === "tracks";
    const track = isTrack ? item as SpotifyTopTrack : undefined;
    const artist = isTrack ? undefined : item as SpotifyTopArtist;
    return {
      id: item.id,
      name: item.name,
      details: track?.artists.map((entry) => entry.name).join(", ") ?? "",
      image: track?.album.images?.[0]?.url ?? artist?.images?.[0]?.url ?? "",
      url: item.external_urls.spotify,
    };
  });

  return NextResponse.json({ items }, {
    headers: { "Cache-Control": "no-store" },
  });
}
