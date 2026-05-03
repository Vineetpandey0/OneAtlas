import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";
import { callGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        console.log("Received request to create app");
        const body = await req.json();
        const { name, userId, config_json: userPrompt } = body;
        
        if (!userId) {
          return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let appConfig;
        try {
          const geminiResponse = await callGemini(userPrompt || name);
          // Strip out markdown if it was returned despite instructions
          const cleanedText = geminiResponse.replace(/```json/g, "").replace(/```/g, "").trim();
          appConfig = JSON.parse(cleanedText);
          
          if (!appConfig.pages || !Array.isArray(appConfig.pages)) {
            throw new Error("Invalid schema from Gemini");
          }
        } catch (e) {
          console.error("Failed to generate config via Gemini, falling back to default:", e);
          appConfig = {
            pages: [
              { path: "/home", type: "landing", entity: "website" },
              { path: "/dashboard", type: "saas_dashboard", entity: "user" },
              { path: "/jobs", type: "job_board", entity: "jobs" },
              { path: "/feed", type: "social_feed", entity: "posts" },
              { path: "/store", type: "ecommerce", entity: "products" }
            ]
          };
        }

        const app = await prisma.app.create({
            data: {
                name,
                config_json: appConfig,
                userId, 
            },
        });
        
        return NextResponse.json({ app }, { status: 200 });
    }
    catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}