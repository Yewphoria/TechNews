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
import { ExtractedNewsArticleDto, RawNewsArticleDto } from "../news/news.dto";
import { ArticleEnrichmentService } from "../news/article-enrichment.service";

const router = Router();

// create instances
const newsletterRepository = new NewsletterRepository();

// const newsProvider = new NewsProvider();
const newsService = new NewsService();

const newsletterGenerator = new NewsletterGenerator();

//ai service
const newAiService = new NewsAIService();
//extract articles using ArticleExtractor
const articleExtractor = new ArticleExtractor();
//article enrichment service
const articleEnrichmentService = new ArticleEnrichmentService(articleExtractor, newAiService);

const newsletterService = new NewsletterService(newsletterRepository, newsService, newsletterGenerator, articleEnrichmentService); 
const newsletterController = new NewsletterController(newsletterService);








// ai tech news sources
router.get("/newsletter/ai/today", asyncHandler(newsletterController.getTodayAINewsletter));

// tech news sources
router.get("/newsletter/tech/today", asyncHandler(newsletterController.getTodayTechNewsletter));


//testing rss feed fetching
router.get("/test", async (req, res) => {
    try {
        console.log("1. Fetching RSS...");
        const rawArticles = await newsService.getLatestArticles();
        console.log(`Fetched ${rawArticles.length} articles`);

        console.log("2. Extracting...");
        const extractedArticles = await Promise.all(
            rawArticles.map(article =>
                articleExtractor.extract(article)
            )
        );
        console.log("Extraction completed");

        console.log("3. Calling AI...");
        const enrichedArticles =
            await newAiService.enrichArticle(
                extractedArticles
            );
        console.log("AI completed");

        res.json(enrichedArticles);

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

// router.get("/test-ai", async (req, res) => {

//     const rawArticles: RawNewsArticleDto[] = [
//         {
//             "title": "Our approach to government and national security partnerships",
//             "description": "Learn how OpenAI approaches government and national security partnerships, with principles for responsible AI use, democratic accountability, and public safety.",
//             "source": "OpenAI",
//             "url": "https://openai.com/index/government-national-security-partnerships",
//             "publishedAt": new Date(),
//             "category": "AI",
//         }
//     ];

//     const extractedArticles = await Promise.all(
//             rawArticles.map(article =>
//                 articleExtractor.extract(article)
//             )
//         );

//     const result =
//         await newAiService.enrichArticle(
//             extractedArticles
//         );

//     res.json(result);

// });

export default router;