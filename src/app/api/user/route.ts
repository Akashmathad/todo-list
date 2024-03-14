import { db } from '@/lib/db';
import { signUpFormSchema } from '@/types/validators/signUpValidators';
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    const existingUserbyUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUserbyUsername) {
      return NextResponse.json(
        { user: null, message: 'User with this username already exists' },
        { status: 409 }
      );
    }

    const existingUserbyEmail = await db.user.findUnique({
      where: { email },
    });

    if (existingUserbyEmail) {
      return NextResponse.json(
        { user: null, message: 'User with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    const newUser = await db.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
      select: {
        username: true,
        email: true,
        id: true,
      },
    });
    return NextResponse.json(
      { user: newUser, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: 'Something went wrong!',
      },
      { status: 500 }
    );
  }
}
