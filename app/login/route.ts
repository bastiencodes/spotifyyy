import { redirect } from "next/navigation";

export async function GET() {
  const state = generateRandomString(16);
  const scope = "user-top-read";

  const searchParams = new URLSearchParams({
    response_type: "code",
    client_id: process.env.SPOTIFY_CLIENT_ID || "",
    scope: scope,
    redirect_uri: process.env.SPOTIFY_REDIRECT_URI || "",
    state: state,
  });

  const redirectUrl = `https://accounts.spotify.com/authorize?${searchParams.toString()}`;
  redirect(redirectUrl);
}

const generateRandomString = function (length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
