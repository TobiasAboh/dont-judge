import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import connectDB from "@/lib/mongodb";


import User from "@/models/User";
import { generateUniqueUsername } from "@/app/utils/generateUniquUsername";


const filePath = path.join(process.cwd(), "data", "userData.json");

const convertDateToISO = (duration) => {
  return new Date(Date.now() + duration * 1000);
}

export async function POST(request) {
  const cookieStore = await cookies();
  try {
    await connectDB();
    // console.log("connected to db");
    const {baseUsername, messages, timer, startTime, duration} = await request.json();
    // console.log("Adding user:", username, "with timer:", startTime, duration);
    const findUser = await User.findOne({ username: baseUsername });

    if (findUser) {
      return NextResponse.json({exist: !!findUser, message: "Username is already taken" });
    }
    const username = await generateUniqueUsername(baseUsername);
    console.log("Generated unique username:", username);
    const user = await User.create({
      username,
      expiresAfter: convertDateToISO(duration), // Set expiration based on duration
      messages,
      timer,
      startTime,
      duration,
       // Set expiration based on duration
    });
    await cookieStore.set("username", username, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'lax',
      path: "/",
      maxAge: timer * 60 * 60,
    });
    // console.log("Generated unique username but after the fact:", user.username);
    return NextResponse.json({
      message: "User added successfully",
      newUser: user,
    }, {status: 201});
  } catch (error) {
    return NextResponse.json({
      message: "Error creating user",
      error,
    });
  }
}

export async function GET(req, { params }) {
  try {
    await connectDB();
    // console.log("Connected to db");

    const { id } = await params;
    // console.log("User Name:", id);
    const user = await User.findOne({ username: id });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user', error }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    await connectDB();
    // console.log("Connected to db");
    const { id } = await params;
    const { message } = await req.json();

    const user = await User.findOneAndUpdate({ username: id }, { $push: { messages: message } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User updated successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
  }
}

