// import { NewsProvider } from "./news.provider"; remove this if not using anymore
import {AI_NEWS_SOURCES} from "./config/ai-news-source.config";
import { TECH_NEWS_SOURCES } from "./config/tech-news-sources.config";
import { RawNewsArticleDto } from "./news.dto";
import { RssProvider } from "./providers/rss.provider";

export class NewsService {

    private readonly rssProvider: RssProvider;

    constructor(   
    ) {
        this.rssProvider = new RssProvider();
    }

    public async getLatestArticles(
        category?: "AI" | "TECH"
    ): Promise<RawNewsArticleDto[]> {

        const source = category === "AI" ? AI_NEWS_SOURCES : TECH_NEWS_SOURCES;

          const results = await Promise.allSettled(
            source.map(source =>
                this.rssProvider.fetchArticles(source)
            )
        );

        const articles = results.filter((result): result is PromiseFulfilledResult<RawNewsArticleDto[]> => result.status === "fulfilled").flatMap(result => result.value); // because it might return failed promises which do not have a value.
        //sort based on publishedAt time
        articles.sort((a,b)=> b.publishedAt.getTime() - a.publishedAt.getTime());

        // create unique articles
        const uniqueArticles = new Map<string, RawNewsArticleDto>();
        for (const article of articles) {
            if (!uniqueArticles.has(article.url)) {
                uniqueArticles.set(article.url, article);
            }
        }

        return [...uniqueArticles.values()].slice(0,5); // return only the latest 5 articles
    }
}