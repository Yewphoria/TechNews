import Parser from "rss-parser";

import { NewsSource } from "../config/news-source";
import { RssMapper } from "../mappers/rss.mapper";
import { RawNewsArticleDto } from "../news.dto";

export class RssProvider {
    private readonly parser: Parser;
    private readonly rssMapper: RssMapper;
    
    constructor() {
        this.parser = new Parser();
        this.rssMapper = new RssMapper();
    }

    public async fetchArticles(source: NewsSource) : Promise<RawNewsArticleDto[]> {
        const feed = await this.parser.parseURL(source.rssUrl);

        return this.rssMapper.toNewsArticles(feed.items, source);
    }
}