// src/app/api/updates/route.ts
import { db } from "@/server/db";
import { NextResponse } from "next/server";

const USER_ID = "demo-user";

export async function POST(request: Request) {
  const body = await request.json();
  const { content } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const update = await db.update.create({
    data: {
      userId: USER_ID,
      content,
    },
  });

  return NextResponse.json(update, { status: 201 });
}

export async function GET() {
  const updates = await db.update.findMany({
    where: { userId: USER_ID },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(updates);
}
