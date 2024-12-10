import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const API_URL = "http://localhost:3001";

export async function GET(request: Request) {
  const cookiesList = await cookies();
  const userId = cookiesList.get("userId")?.value || "";

  if (!userId) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }

  const response = await fetch(`${API_URL}/cart?userId=${userId}`);
  const cart = await response.json();

  return NextResponse.json(cart);
}

export async function POST(request: Request) {
  const cookiesList = await cookies();
  const userId = cookiesList.get("userId")?.value || "";

  if (!userId) {
    return NextResponse.json({ message: "User not logged in" }, { status: 401 });
  }

  const body = await request.json();
  const newCartItem = { ...body, userId };

  const response = await fetch(`${API_URL}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCartItem),
  });

  const result = await response.json();
  return NextResponse.json(result, { status: 201 });
}
