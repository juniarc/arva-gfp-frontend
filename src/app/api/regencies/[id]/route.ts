import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${id}.json`);
    const cities = await response.json();

    return NextResponse.json(cities);
  } catch (error: any) {
    return NextResponse.json(JSON.stringify({ message: error.message }), { status: 404 });
  }
}
