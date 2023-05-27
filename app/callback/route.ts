export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  console.log(code, state);

  const body = JSON.stringify({ code, state });
  return new Response(body, { status: 200 });
}
