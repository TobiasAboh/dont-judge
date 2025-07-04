import connectDB from "@/lib/mongodb";
import Visit from "@/models/Visit";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    let visit = await Visit.findById("site_visits");

    if (visit) {
      visit.count += 1;
      await visit.save();
    } else {
      visit = new Visit();
      await visit.save();
    }

    return NextResponse.json({ count: visit.count });
  } catch (error) {
    console.error('Error incrementing visit count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
