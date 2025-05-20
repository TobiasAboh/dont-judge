import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";

const filePath = path.join(process.cwd(), "data", "userData.json");

export async function POST(request) {
  try {
    await connectDB();
    console.log("connected to db");
    const {username, messages} = await request.json();
    const user = await User.create({
      username,
      messages,
    });
    return NextResponse.json({
      message: "User added successfully",
      newUser: user,
    }, {status: 201});
    // const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    // const newUser = await request.json();
    // users.push(newUser);
    // fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    // return NextResponse.json({
    //   message: "User added successfully",
    //   newUser,
    // });
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
    console.log("Connected to db");

    const { id } = await params;
    console.log("User Name:", id);
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
    console.log("Connected to db");
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

