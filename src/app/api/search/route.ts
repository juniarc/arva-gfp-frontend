import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const query = searchParams.get("search");

  // Return response
  return new Response(JSON.stringify({ query }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
