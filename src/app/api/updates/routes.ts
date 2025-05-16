// src/app/api/updates/route.ts
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const USER_ID = "demo-user"; // autenticación simulada

export async function POST(request: Request) {
  const body = await request.json();
  const { content } = body;

  if (!content || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }

  const update = await prisma.update.create({
    data: {
      userId: USER_ID,
      content,
    },
  });

  return NextResponse.json(update, { status: 201 });
}

export async function GET() {
  const updates = await prisma.update.findMany({
    where: { userId: USER_ID },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(updates);
}
