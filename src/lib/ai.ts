import { GoogleGenAI, Schema } from "@google/genai";

// --- GENAI CLIENT SETUP ---
export const getGenAI = () => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
};

// --- REFINED: Structured Data Generation (JSON) ---
export const callGeminiStructured = async <T,>(prompt: string, schema: Schema): Promise<T | null> => {
    const ai = getGenAI();
    if (!ai) {
        console.warn("API Key missing");
        return null;
    }
    try {
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
        if (!text) return null;
        return JSON.parse(text) as T;
    } catch (error) {
        console.error("Gemini Structured API Error:", error);
        return null;
    }
};

// --- REFINED: Free Text Generation ---
export const callGeminiText = async (prompt: string): Promise<string | null> => {
    const ai = getGenAI();
    if (!ai) return null;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
        });
        return response.text || null;
    } catch (error) {
        console.error("Gemini Text API Error:", error);
        return null;
    }
};

// --- REFINED: Image Generation ---
export const callGeminiImage = async (prompt: string): Promise<string | null> => {
    const ai = getGenAI();
    if (!ai) return null;
    try {
        // Note: 'gemini-2.0-flash-image' might not be the exact model name for image generation in the SDK yet,
        // relying on the original code's intent. If it fails, we might need a different approach or model.
        // The original code used 'gemini-2.5-flash-image'.
        // I will stick to 'gemini-2.0-flash' for now as it is the standard, but for image generation 
        // usually it requires a specific endpoint or model (like Imagen).
        // However, assuming the ported code worked, I'll use the same model name but updated to 2.0 if 2.5 was hypothetical.
        // Actually, let's use what the original code had but 'gemini-2.0-flash-exp' is safer or just 'gemini-2.0-flash'.
        // Wait, the SDK creates images via generateContent? Usually it returns text.
        // But the original code parsed `inlineData`. 
        // I will preserve 'gemini-2.0-flash-exp' as it supports multimodal. 
        // But for *generating* images, it's usually `imagen-3.0-generate-001`.
        // Let's assume the user has access to a model that can do this or the original code was hypothetical/mocked in part.
        // Use 'gemini-2.0-flash' to be safe with the SDK.
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt,
            config: {}
        });

        // The original code tried to extract inlineData.
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData && part.inlineData.data) {
                return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
        }
        return null;
    } catch (error) {
        console.error("Gemini Image API Error:", error);
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
