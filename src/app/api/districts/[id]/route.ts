import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const response = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/districts/${id}.json`);
    const districts = await response.json();

    return NextResponse.json(districts);
  } catch (error: any) {
    return NextResponse.json(JSON.stringify({ message: error.message }), { status: 404 });
  }
}
