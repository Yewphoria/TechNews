import {ExtractedNewsArticleDto, ProcessedNewsArticleDto, } from "../news.dto";
import { config } from "../../../config/config";
import { GoogleGenAI } from "@google/genai";

interface GeminiArticleResponse {
    id: number;
    summary: string;
    whyDoesThisMatterToMe: string;
}


export class NewsAIService {

    private readonly client = new GoogleGenAI({
    apiKey: config.gemini.apiKey,
    });

    public async enrichArticle(
        articles: ExtractedNewsArticleDto[]
    ): Promise<ProcessedNewsArticleDto[]> {


        

       const articlePayload = articles.map((article, index) => ({
        id: index,
        title: article.title,
        description: article.description,
        content: article.content.slice(0, 4000),
        }));
    

    

        const response = await this.client.models.generateContent({
        config: {
            thinkingConfig: {
                thinkingBudget: 0
            },
        },
        model: config.gemini.model,
        contents: `
        You are a technology news editor.

        The audience is a junior web developer.

        Return ONLY valid JSON.

        Return an array.

        Each object must have exactly this shape:

        {
        "id": number,
        "summary": string,
        "whyDoesThisMatterToMe": string
        }

        Rules:

        - summary:
        - Maximum 2 sentences

        - whyDoesThisMatterToMe:
        - Maximum 3 sentences
        - Explain the impact/why it matters for web developers.

        Do not include markdown.
        Do not include code blocks.
        Do not include any additional fields.

        Articles:

        ${JSON.stringify(articlePayload)}
        `
        });

        if (!response.text) {
            throw new Error("Gemini returned an empty response.");
        }              

        try {
        const aiResponse = JSON.parse(response.text) as GeminiArticleResponse[];

        return aiResponse.map(result => ({
            ...articles[result.id],
            summary: result.summary,
            whyDoesThisMatterToMe: result.whyDoesThisMatterToMe,
        }));
        } catch (error) {
            throw new Error("Failed to parse AI response.");
        }
    }
}