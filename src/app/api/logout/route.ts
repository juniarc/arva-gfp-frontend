import { NextResponse } from "next/server";

export async function POST() {
  // Membuat response logout
  const response = NextResponse.json({ message: "Logged out successfully!" });

  // Menghapus cookies "token" dan "userId"
  response.cookies.delete("token");
  response.cookies.delete("userId");

  return response;
}
