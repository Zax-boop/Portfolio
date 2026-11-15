import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../../../../utils/album_ranking/getAccessToken";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json({ error: "A search query is required." }, { status: 400 });
  }

  try {
    const token = await getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=5`,
      { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Spotify album search failed." }, { status: 502 });
    }

    const data = await response.json();
    return NextResponse.json(data.albums?.items ?? []);
  } catch {
    return NextResponse.json({ error: "Spotify album search is unavailable." }, { status: 502 });
  }
}
