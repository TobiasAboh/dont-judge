import connectDB from "@/lib/mongodb";
import Visit from "@/models/Visit";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    const visit = await Visit.findById("site_visits");
    return NextResponse.json({ count: visit ? visit.count : 0 });
  } catch (error) {
    console.error('Error fetching visit count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
