import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export async function POST(req: Request) {
  try {
    const { email, password, username } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();

    const user = await User.findOne({ email }).select("_id");

    if (user) {
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 400 }
      );
    }

    await User.create({
      email,
      password: hashedPassword,
      username,
    });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user.", error },
      { status: 500 }
    );
  }
}
