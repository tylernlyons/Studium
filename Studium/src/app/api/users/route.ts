import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/userSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";


export const POST = async (request: NextRequest) => {
  const {name, username, email, password} = await request.json();

  console.log(username, email, password);

  await connectMongoDB();
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name,
    username,
    password: hashedPassword,
    email
  }
  try {
    await User.create(newUser);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new NextResponse(e.message, { status: 500 });
    }
  }

  return new NextResponse("User has been created", {
    status: 201,
  });

 }