import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { username } = await params;
    console.log(username)

    const user = await User.findOne({username: username});
    const messages = user.messages;
    return NextResponse.json(messages, { statusText: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch messages", error: error.message },
      { status: 500 }
    );
  }
}
