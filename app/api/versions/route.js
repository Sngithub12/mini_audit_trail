import { NextResponse } from "next/server";
import { getVersions } from "@/lib/storage";


export async function GET() {
  const versions = await getVersions();
  return NextResponse.json(versions);
}




export function POST() {
  return NextResponse.json(
    { error: "Use GET to fetch versions" },
    { status: 405 }
  );
}



