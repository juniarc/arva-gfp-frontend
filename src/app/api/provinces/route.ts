import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const provinces = await fetch("https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json");
    const data = await provinces.json();

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(JSON.stringify({ message: error.message }), { status: 404 });
  }
}
