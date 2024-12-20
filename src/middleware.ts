import { NextRequest, NextResponse, userAgent } from "next/server";
import { boolean } from "yup";

const protectedRoutes = ["/my-shop", "/my-shop/create-shop", "/my-shop/:shopId", "/buy-now", "/cart", "/cart/shipment"];
const publicRoutes = ["/login", "/signup", "/", "/:shopName/:productInfo", "/buy-now", "/:shopInfo"];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const isProtectedRoutes = protectedRoutes.includes(url.pathname);
  const isPublicRoutes = protectedRoutes.includes(url.pathname);

  const isLoggedIn = true;

  if (!isLoggedIn && isProtectedRoutes) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const userToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczNDYyMDIyNywianRpIjoiZDU5NDcyZTctZjdkYi00NjExLTg4MmYtMWQzZWRiOTczMTI2IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIyIiwibmJmIjoxNzM0NjIwMjI3LCJjc3JmIjoiMjBmNjJiYTUtOGFlYy00YjM4LThkN2MtMWFlNWYzZTA3Y2FhIiwiZXhwIjoxNzM0NzA2NjI3LCJ1c2VybmFtZSI6InRlc3Q2OSIsImVtYWlsIjoidGVzdDY5QG1haWwuY29tIiwicm9sZSI6InVzZXIifQ.Pno2m1oIbbcmGKggnCw0sNb-bq1LVclE1EtALuhsehQ";
  response.cookies.set("token", userToken, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

  const userId = 22;
  response.cookies.set("userId", userId.toString(), { httpOnly: true, secure: process.env.NODE_ENV === "production" });

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
