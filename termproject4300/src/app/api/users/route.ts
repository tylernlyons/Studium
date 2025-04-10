import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/userSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const { name, username, password, email } = await request.json();
    await connectMongoDB();
    const user = await User.create({ name, username, password, email });
    return NextResponse.json({ user }, { status: 201 });
  }