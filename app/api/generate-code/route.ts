import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, language, length } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not configured" },
        { status: 500 },
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const lengthAdjective = length === "short" ? "short (5-15 lines)" : length === "moderate" ? "moderate (15-40 lines)" : "long (40-80 lines)";

    const generationResult = await model.generateContent(
      `Generate a ${lengthAdjective} code snippet in ${language} based on the following instruction. Return ONLY the code without any explanations, comments, or markdown formatting. The code should be something appropriate for a typing practice test.\n\nInstruction: ${prompt}`,
    );

    const response = generationResult.response;
    const code = response.text();

    return NextResponse.json({ code });
  } catch (error) {
    console.error("Error generating code:", error);
    return NextResponse.json(
      { error: "Failed to generate code" },
      { status: 500 },
    );
  }
}
