import { NextRequest, NextResponse } from "next/server";
import { stateKey } from "../_utils/constants";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const storedState = request.cookies.get(stateKey)?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response("Invalid state or code or state mismatch", {
      status: 400,
    });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID || "";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "";

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  if (!res.ok) {
    return new Response("Failed to fetch access token", {
      status: res.status,
    });
  }

  const { access_token, refresh_token } = await res.json();
  const body = JSON.stringify({ access_token, refresh_token });
  const response = new NextResponse(body, { status: 200 });
  response.cookies.delete(stateKey);
  return response;
}
