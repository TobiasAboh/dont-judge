import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';


export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const user = await User.findOne({ username: id });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ startTime: user.startTime, duration: user.duration }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user', error }, { status: 500 });
  }
}