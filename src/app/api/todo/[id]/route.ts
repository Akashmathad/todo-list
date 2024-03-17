import { db } from '@/lib/db';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextResponse } from 'next/server';

export async function GET(req: Request, context: { params: Params }) {
  const id = context.params.id;
  try {
    const todos = await db.todo.findMany({
      where: { userId: id },
      orderBy: [
        { completed: 'asc' }, // Sort completed todos first (ascending order, so false comes before true)
        { priority: 'desc' }, // Then sort by priority in descending order
        { createdAt: 'asc' }, // Finally, sort by createdAt in ascending order
      ],
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        endTime: true,
        completed: true,
        priority: true,
        userId: false,
      },
    });
    return NextResponse.json({ length: todos.length, todos });
  } catch (e) {
    console.log(e);
  }
}

export async function POST(req: Request, context: { params: Params }) {
  const id = context.params.id;
  const body = await req.json();
  const { title, description, endTime, completed, priority } = body;
  try {
    const newTodo = await db.todo.create({
      data: {
        title,
        description,
        endTime,
        completed,
        priority,
        userId: id,
      },
    });
    return NextResponse.json({ id, todo: newTodo });
  } catch (e) {
    console.log(e);
  }
}

export async function DELETE(req: Request, context: { params: Params }) {
  try {
    const id = context.params.id;
    await db.todo.delete({
      where: { id },
    });

    return NextResponse.json({ data: null }, { status: 204 });
  } catch (e) {
    return NextResponse.json(
      { message: 'Record to delete doesnt exist' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, context: { params: Params }) {
  try {
    const id = context.params.id;
    const body = await req.json();
    const updatedTodo = await db.todo.update({
      where: { id },
      data: {
        completed: body.value,
      },
    });
    return NextResponse.json({ data: updatedTodo }, { status: 200 });
  } catch (e) {
    console.log(e);
  }
}
