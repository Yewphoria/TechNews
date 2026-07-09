import { NewsletterRepository } from "./newsletter.repository";
import { NewsletterResponseDto } from "./newsletter.dto";
import { NewsService } from "../news/news.service";
import { NewsletterGenerator } from "./newsletter.generator";
import { AppError } from "../../shared/errors/AppError";
import { ArticleEnrichmentService } from "../news/article-enrichment.service";


export class NewsletterService {
    constructor(
        private readonly newsletterRepository: NewsletterRepository,
        private readonly newsService: NewsService,
        private readonly newsletterGenerator: NewsletterGenerator,
        private readonly articleEnrichmentService: ArticleEnrichmentService
    ) {}

    public async getTodayNewsletter(category: "AI" | "TECH"): Promise<NewsletterResponseDto> {


    const existingNewsletter = await this.newsletterRepository.findToday();

    if (existingNewsletter) {
        
        return existingNewsletter;
    }

  
    const rawArticles = await this.newsService.getLatestArticles(category);
    console.log(`Fetched ${rawArticles.length} articles`);

    if (rawArticles.length === 0) {
        throw new AppError("No articles found.", 503);
    }

   
    const processedArticles =
        await this.articleEnrichmentService.enrichArticles(rawArticles);
   

    
    const newsletter =
        this.newsletterGenerator.generate(processedArticles);

    
    await this.newsletterRepository.save(newsletter);

    

    return newsletter;
}
}   