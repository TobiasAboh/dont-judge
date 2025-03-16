import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

const filePath = path.join(process.cwd(), "data", "userData.json");

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log(id)
    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const index = users.findIndex((item) => item.id === id);
    const messages = users[index].messages;
    return NextResponse.json(messages, { statusText: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch messages", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;

    const { message } = await request.json();

    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const index = users.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "User not found" },
        { statusText: 404 }
      );
    }

    users[index].messages.push({id: users[index].messages.length + 1, message});
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json(users[index].messages, { statusText: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to process request", error: error.message },
      { statusText: 500 }
    );
  }
}
