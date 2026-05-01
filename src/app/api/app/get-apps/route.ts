import { prisma } from "@/lib/db/prisma";
import { useAuth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { userId } = useAuth();
        const apps = await prisma.app.findMany({
        where: {
            userId: userId || "",
        },
        include: {
            records: true
        }
    })
        return NextResponse.json(apps, { status: 200 });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}