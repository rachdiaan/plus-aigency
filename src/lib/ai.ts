import { Schema } from "@google/genai";

// --- CLIENT SIDE PROXY TO SERVER API ---
export const callGeminiStructured = async <T,>(prompt: string, schema: Schema): Promise<T | null> => {
    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "structured",
                prompt,
                schema,
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Failed to fetch from AI API");
        }

        const data = await response.json();
        return data.result as T;
    } catch (error) {
        console.error("Gemini Structured API Error (client proxy):", error);
        return null;
    }
};

export const callGeminiText = async (prompt: string): Promise<string | null> => {
    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "text",
                prompt,
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Failed to fetch from AI API");
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Gemini Text API Error (client proxy):", error);
        return null;
    }
};

export const callGeminiImage = async (prompt: string): Promise<string | null> => {
    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                action: "image",
                prompt,
            }),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || "Failed to fetch from AI API");
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Gemini Image API Error (client proxy):", error);
        return null;
    }
};

// --- UTILS ---
export const downloadImage = (dataUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
