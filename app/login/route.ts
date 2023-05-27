import { NextResponse } from "next/server";
import { generateRandomString } from "../_utils/generateRandomString";
import { stateKey } from "../_utils/constants";

export async function GET() {
  const state = generateRandomString(16);

  const scope = "user-top-read";
  const clientId = process.env.SPOTIFY_CLIENT_ID || "";
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI || "";

  const searchParams = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
  });
  const redirectUrl = `https://accounts.spotify.com/authorize?${searchParams.toString()}`;

  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set(stateKey, state);
  return response;
}
