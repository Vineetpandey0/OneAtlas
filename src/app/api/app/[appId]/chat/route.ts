import { prisma } from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const {userId} = await auth()
    try {
        const res = await prisma.chats.findMany({
            where: {
                userId: userId
            }
        })
        return NextResponse.json({ chats: res }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch chats" }, { status: 500 })
    }
}