import connectDB from "@/lib/mongodb";
import Visit from "@/models/Visit";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await connectDB();
    await Visit.findByIdAndUpdate(
      "site_visits",
      { $inc: { confessions: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error incrementing confession count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
