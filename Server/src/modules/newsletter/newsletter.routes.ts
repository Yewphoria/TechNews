import { Router } from "express";
import { NewsletterController } from "./newsletter.controller";
import { NewsletterService } from "./newsletter.service";
import { NewsletterRepository } from "./newsletter.repository";
import { asyncHandler } from "../../utils/asyncHandler";
import { NewsService } from "../news/news.service";
import { NewsProvider } from "../news/news.provider";
import { NewsletterGenerator } from "./newsletter.generator";
import { NewsAIService } from "../news/ai/news-ai.service";

import { RssProvider } from "../news/providers/rss.provider";
import { ArticleExtractor } from "../news/extractors/article-extractor";
import { config } from "../../config/config";


//remove this after testing
import { ExtractedNewsArticleDto } from "../news/news.dto";

const router = Router();

// create instances
const newsletterRepository = new NewsletterRepository();

// const newsProvider = new NewsProvider();
const newsService = new NewsService();

const newsletterGenerator = new NewsletterGenerator();

const newsletterService = new NewsletterService(newsletterRepository, newsService, newsletterGenerator); 
const newsletterController = new NewsletterController(newsletterService);

//testing ai
const newAiService = new NewsAIService();


router.get("/newsletter/today", asyncHandler(newsletterController.getTodayNewsletter));


//testing rss feed fetching
router.get("/test", async (req, res) => {
    const articles = await newsService.getLatestArticles();

    res.json(articles);
});

router.get("/test-ai", async (req, res) => {

    const articles: ExtractedNewsArticleDto[] = [
        {
            title: "OpenAI launches GPT-5.5",
            description:
                "OpenAI has announced GPT-5.5, a new reasoning-focused model with stronger coding capabilities.",

            content: `
OpenAI today officially released GPT-5.5.

The model significantly improves coding, debugging and reasoning.

Developers can access GPT-5.5 through the OpenAI API and ChatGPT.

OpenAI says the model performs much better on software engineering benchmarks.
            `,

            url: "https://example.com/openai",
            source: "OpenAI",
            publishedAt: new Date(),
            category: "AI",
        },

        {
            title: "Anthropic releases Claude 5",
            description:
                "Anthropic introduced Claude 5 with improved long-context reasoning and coding assistance.",

            content: `
Anthropic announced Claude 5.

The new model improves long-context understanding and software engineering workflows.

Claude 5 is designed to help developers review code, understand repositories and automate repetitive tasks.

The company also improved tool calling and reliability.
            `,

            url: "https://example.com/claude",
            source: "Anthropic",
            publishedAt: new Date(),
            category: "AI",
        },
    ];

    const result =
        await newAiService.enrichArticle(
            articles
        );

    res.json(result);

});

export default router;