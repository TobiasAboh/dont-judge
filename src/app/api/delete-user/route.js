import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req) {
  const { username } = await req.json();
  const cookieStore = await cookies();

  try {
    await connectDB();

    const result = await User.deleteOne({ username: username });
    await cookieStore.set("username", "", {
      maxAge: 0,
      path: "/",
    });
    // if (result.deletedCount === 0) {
    //     return NextResponse.json({ message: "User not found" }, { status: 404 });
    // }
    return NextResponse.json({ success: result.deletedCount === 1 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: error.message, error }, { status: 500 });
  }
}
