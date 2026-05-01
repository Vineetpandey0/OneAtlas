import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        console.log("Received request to create app");
        const { name, config_json, userId } = await req.json();
        const app = await prisma.app.create({
            data: {
                name,
                config_json,
                userId,
            },
        })
        return NextResponse.json(app, { status: 200 });
    }
    catch (err) {
        console.log(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}