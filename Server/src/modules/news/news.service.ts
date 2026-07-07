import { NewsProvider } from "./news.provider";
import { RawNewsArticleDto } from "./news.dto";

export class NewsService {
    constructor(
        private readonly newsProvider: NewsProvider
    ) {}

    public async getLatestArticles(): Promise<RawNewsArticleDto[]> {
        const articles = await this.newsProvider.fetchLatestArticles();

        return articles;
    }
}2