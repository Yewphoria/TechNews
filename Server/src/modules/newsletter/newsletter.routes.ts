import { Router } from "express";
import { NewsletterController } from "./newsletter.controller";
import { NewsletterService } from "./newsletter.service";
import { NewsletterRepository } from "./newsletter.repository";
import { asyncHandler } from "../../utils/asyncHandler";
import { NewsService } from "../news/news.service";
import { NewsProvider } from "../news/news.provider";
import { NewsletterGenerator } from "./newsletter.generator";

import { RssProvider } from "../news/providers/rss.provider";

const router = Router();

// create instances
const newsletterRepository = new NewsletterRepository();

const newsProvider = new NewsProvider();
const newsService = new NewsService(newsProvider);

const newsletterGenerator = new NewsletterGenerator();

const newsletterService = new NewsletterService(newsletterRepository, newsService, newsletterGenerator); 
const newsletterController = new NewsletterController(newsletterService);


router.get("/newsletter/today", asyncHandler(newsletterController.getTodayNewsletter));


//testing rss feed fetching


export default router;