import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
export async function GET(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        console.log("User Name:", id);
        const user = await User.findOne({ username: id }).select("messages");
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const messages = user.messages;
        // console.log("Messages:", user.messages);

        return NextResponse.json( {messages}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching messages', error }, { status: 500 });
    }
}