import connectDB from "@/lib/mongodb";
import Visit from "@/models/Visit";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    // console.log("Just Visited");
    const result = await Visit.findByIdAndUpdate(
      "site_visits",
      { $inc: { count: 1 } },
      { new: true, upsert: true }
    );

    return NextResponse.json({ count: result.count });
  } catch (error) {
    console.error('Error incrementing visit count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
