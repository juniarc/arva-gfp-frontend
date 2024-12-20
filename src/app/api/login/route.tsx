import api from "@/services/api/api";
import { LoginBody } from "@/types/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log("hai");
  try {
    // Parse request body
    const { email, password } = await request.json();

    const reqBody: LoginBody = {
      email: email,
      password: password,
    };

    const response = await api.login(reqBody);

    // Parse response from external server
    const { access_token, user_id } = response;

    if (!access_token || !access_token) {
      return NextResponse.json({ error: "Invalid response from login server!" }, { status: 500 });
    }

    // Create response with cookies
    const nextResponse = NextResponse.json({ message: "Login successful!" });

    // Set cookies for token and userId
    nextResponse.cookies.set("token", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    nextResponse.cookies.set("userId", user_id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return nextResponse;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal server error!" }, { status: 500 });
  }
}
