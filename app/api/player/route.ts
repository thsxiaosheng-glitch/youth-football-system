import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const players = await prisma.player.findMany();

  return NextResponse.json(players);
}

export async function POST(request: Request) {
  const body = await request.json();

  const player = await prisma.player.create({
    data: {
      name: body.name,
      age: Number(body.age),
      position: body.position,
      speed: Number(body.speed),
      shooting: Number(body.shooting),
    },
  });

  return NextResponse.json(player);
}