import { NewsletterRepository } from "./newsletter.repository";
import { NewsletterResponseDto } from "./newsletter.dto";
import { NewsService } from "../news/news.service";
import { NewsletterGenerator } from "./newsletter.generator";
import { AppError } from "../../shared/errors/AppError";


export class NewsletterService {
    constructor(
        private readonly newsletterRepository: NewsletterRepository,
        private readonly newsService: NewsService,
        private readonly newsletterGenerator: NewsletterGenerator
    ) {}

    public async getTodayNewsletter(): Promise<NewsletterResponseDto> {

        const existingNewsletter = await this.newsletterRepository.findToday();

        if (existingNewsletter) {
            return existingNewsletter;
        }

        const articles = await this.newsService.getLatestArticles();
        
        if (articles.length === 0) {
            throw new AppError("No articles found/something wrong with getting articles.", 503);
        }

        const newsletter = this.newsletterGenerator.generate(articles);

        await this.newsletterRepository.save(newsletter);

        return newsletter;
    }
}   