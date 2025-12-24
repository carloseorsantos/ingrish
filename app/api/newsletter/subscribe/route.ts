import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email are required" }, { status: 400 });
  }

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (existingEmail) {
    if (!existingEmail.active) {
      await prisma.user.update({
        where: { email },
        data: { active: true },
      });
    }
    
    return NextResponse.json(
      { error: "Email already subscribed" },
      { status: 409 }
    );
  }

  await prisma.user.upsert({
    where: { email },
    update: { active: true },
    create: { email },
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const result = await prisma.user.count({
    where: { active: true },
  });

  return NextResponse.json({ result });
}
