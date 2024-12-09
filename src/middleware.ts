import { NextRequest, NextResponse, userAgent } from "next/server";

const protectedRoutes = ["/my-shop", "/my-shop/:shopId", "/buy-now"];
const publicRoutes = ["/login", "/signup", "/", "/:shopName/:productInfo", "/buy-now", "/:shopInfo"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const isProtectedRoutes = protectedRoutes.includes(url.pathname);
  const isPublicRoutes = protectedRoutes.includes(url.pathname);

  const isLoggedIn = request.cookies.get("authToken");

  // if (!isLoggedIn && isProtectedRoutes) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Viewport cookies
  const { device } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  response.cookies.set("viewport", viewport, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  // Viewport user untuk my-shop
  // const dummyToken = "fake-token";
  // const token = request.cookies.set("token", dummyToken);
  // if (url.pathname.startsWith("/my-shop") && !token && isProtectedRoutes) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return response;
}

export const config = {
  matcher: ["/", "/:shopName/:productInfo", "/buy-now", "/:shopName", "/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
