import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is read from server environment variables
const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured on the server.");
    }
    return new GoogleGenAI({ apiKey });
};

export async function POST(request: Request) {
    try {
        const { action, prompt, schema } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const ai = getGenAI();

        if (action === "structured") {
            if (!schema) {
                return NextResponse.json({ error: "Schema is required for structured action" }, { status: 400 });
            }
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: prompt,
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: schema,
                    temperature: 0.7,
                }
            });
            const text = response.text;
            if (!text) {
                return NextResponse.json({ error: "No text returned from Gemini" }, { status: 500 });
            }
            return NextResponse.json({ result: JSON.parse(text) });
        } else if (action === "text") {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: prompt,
            });
            return NextResponse.json({ result: response.text || "" });
        } else if (action === "image") {
            const response = await ai.models.generateContent({
                model: 'gemini-2.0-flash',
                contents: prompt,
            });

            for (const part of response.candidates?.[0]?.content?.parts || []) {
                if (part.inlineData && part.inlineData.data) {
                    return NextResponse.json({ result: `data:${part.inlineData.mimeType};base64,${part.inlineData.data}` });
                }
            }
            return NextResponse.json({ error: "No image generated from Gemini" }, { status: 500 });
        } else {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error: any) {
        console.error("API AI Route Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
