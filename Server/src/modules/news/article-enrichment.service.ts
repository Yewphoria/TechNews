import {
    RawNewsArticleDto,
    ProcessedNewsArticleDto,
    ExtractedNewsArticleDto,
} from "./news.dto";

import { ArticleExtractor } from "./extractors/article-extractor";
import { NewsAIService } from "./ai/news-ai.service";

export class ArticleEnrichmentService {

    constructor(
        private readonly articleExtractor: ArticleExtractor,
        private readonly newsAIService: NewsAIService,
    ) {}

    public async enrichArticles(
        articles: RawNewsArticleDto[]
    ): Promise<ProcessedNewsArticleDto[]> {

        const extractedArticles: ExtractedNewsArticleDto[] =
            await Promise.all(
                articles.map(article =>
                    this.articleExtractor.extract(article)
                )
            );

        // AI integration.
        const processedArticles =
            await this.newsAIService.enrichArticle(
                extractedArticles
            );
        return processedArticles;
    }
}