import { RawNewsArticleDto } from "../news.dto";
import { NewsSource } from "../config/news-source";
import Parser from "rss-parser";

export class RssMapper {

    //class method
    public toNewsArticle(item: Parser.Item,source: NewsSource): RawNewsArticleDto {
        return {
            title: item.title ?? "",

            description: item.contentSnippet  // fallback from contentSnippet to content if contentSnippet is not available then to ""
                ?? item.content
                ?? "",

            source: source.name,

            url: item.link ?? "",

            publishedAt: item.pubDate
                ? new Date(item.pubDate)
                : new Date(),

            category: source.category,
        };
    }

    public toNewsArticles(items: Parser.Item[],source: NewsSource): RawNewsArticleDto[] 
    {
        return items.map(item =>
            this.toNewsArticle(item, source)
        );
    }
}