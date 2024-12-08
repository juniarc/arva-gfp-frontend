import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;

  // Viewport cookies
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  response.cookies.set("viewport", viewport, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // Viewport user untuk my-shop
  const token = request.cookies.get("token")?.value || null;
  if (url.pathname.startsWith("/my-shop") && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/", "/:shopName/:productInfo", "/buy-now", "/:shopName"],
};
