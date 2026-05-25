import { prisma } from "@/lib/prisma";

export async function GET() {

  const trainings = await prisma.training.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(trainings);
}

export async function POST(req: Request) {

  const body = await req.json();

  const training = await prisma.training.create({
    data: {
      date: body.date,
      title: body.title,
      duration: body.duration,
      intensity: body.intensity,
      note: body.note,
    },
  });

  return Response.json(training);
}export async function DELETE(req: Request) {

  const body = await req.json();

  await prisma.training.delete({
    where: {
      id: body.id,
    },
  });

  return Response.json({
    success: true,
  });
}