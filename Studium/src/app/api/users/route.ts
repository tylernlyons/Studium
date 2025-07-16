import connectMongoDB from "../../../../config/mongodb";
import User from "@/models/userSchema"
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";


export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();


  await connectMongoDB();
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return NextResponse.json(
      { error: 'Email already exists' },
      { status: 409 }
    );
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = {
    name,
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