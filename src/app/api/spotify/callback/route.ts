import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function errorResponse(message: string, status: number) {
  return new NextResponse(`<h1>Spotify setup failed</h1><p>${escapeHtml(message)}</p>`, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
    },
  });
}

export async function GET(request: NextRequest) {
  const callbackError = request.nextUrl.searchParams.get("error");
  if (callbackError) {
    return errorResponse("Spotify authorization was declined.", 400);
  }

  const code = request.nextUrl.searchParams.get("code");
  const returnedState = request.nextUrl.searchParams.get("state");
  const cookieStore = await cookies();
  const expectedState = cookieStore.get("spotify_oauth_state")?.value;
  cookieStore.delete("spotify_oauth_state");

  if (!code || !returnedState || !expectedState || returnedState !== expectedState) {
    return errorResponse("The authorization response could not be verified. Please try again.", 400);
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return errorResponse("Spotify client credentials and redirect URI must be configured.", 500);
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
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
      cache: "no-store",
    });
  } catch {
    return errorResponse("Could not reach Spotify to complete authorization.", 502);
  }

  if (!tokenResponse.ok) {
    return errorResponse("Spotify rejected the authorization code. Please try connecting again.", 502);
  }

  const tokenData = await tokenResponse.json();
  if (typeof tokenData.refresh_token !== "string") {
    return errorResponse("Spotify did not return a refresh token. Please try connecting again.", 502);
  }

  const refreshToken = escapeHtml(tokenData.refresh_token);
  return new NextResponse(
    `<h1>Spotify authorized</h1>
    <p>Copy this refresh token into <code>SPOTIFY_REFRESH_TOKEN</code> in your local or deployment environment variables, then restart/redeploy the app.</p>
    <p><code>${refreshToken}</code></p>
    <p>You can close this page after saving the token.</p>`,
    {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
        "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'",
      },
    }
  );
}
