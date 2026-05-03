import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET(
  req: NextRequest,
  context: any
) {
  try {
    const params = await context.params;
    const { appId } = params;

    const app = await prisma.app.findUnique({
      where: { id: appId },
      select: {
        id: true,
        name: true,
        deployedUrl: true,
        createdAt: true
      }
    });

    if (!app) {
      return NextResponse.json({ error: "App not found" }, { status: 404 });
    }

    return NextResponse.json(app);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
