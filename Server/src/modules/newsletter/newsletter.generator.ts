import { ProcessedNewsArticleDto } from "../news/news.dto";
import { NewsletterResponseDto } from "./newsletter.dto";

export class NewsletterGenerator {
    
    public generate(
        articles: ProcessedNewsArticleDto[]
    ): NewsletterResponseDto {
        const now = new Date();
        return {
            date: now.toISOString().split("T")[0],
            generatedAt: now.toISOString(),
            articles: articles.map((article, index) => ({
                id: index + 1,
                title: article.title,
                description: article.description,
                summary: article.summary,
                whyDoesThisMatterToMe:
                    article.whyDoesThisMatterToMe,
                url: article.url,
                source: article.source,
                publishedAt: article.publishedAt,
                imageUrl: article.imageUrl,
            })),
        };
    }
}