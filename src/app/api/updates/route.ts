// src/app/api/updates/route.ts
import { db } from "@/server/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { content, userId } = body;

  if (!userId || !content || typeof content !== "string") {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const update = await db.update.create({
      data: {
        userId,
        content,
      },
    });

    return NextResponse.json(update, { status: 201 });
  } catch (err) {
    console.error("❌ Error saving update:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET /api/updates?userId=...&page=1&limit=10
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 })
  }

  const skip = (page - 1) * limit

  const [updates, total] = await Promise.all([
    db.update.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    db.update.count({ where: { userId } }),
  ])

  return NextResponse.json({ updates, total, page, limit })
}


