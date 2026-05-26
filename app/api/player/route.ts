import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const players = await prisma.player.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json(
      { error: "获取球员失败" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const player = await prisma.player.create({
      data: {
        name: body.name,
        age: Number(body.age),
        position: body.position,
        speed: Number(body.speed || 60),
        shooting: Number(body.shooting || 60),
      },
    });

    return NextResponse.json(player);
  } catch (error) {
    return NextResponse.json(
      { error: "创建球员失败" },
      { status: 500 }
    );
  }
}