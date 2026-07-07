import { RawNewsArticleDto} from "./news.dto";

export class NewsProvider {
    public async fetchLatestArticles(): Promise<RawNewsArticleDto[]> {
        return [
            {
                title: "OpenAI releases a new coding model",
                description: "The new model improves software engineering tasks.",
                url: "https://example.com/article",
                source: "OpenAI",
                publishedAt: new Date(),
                category: "AI",
            },
            {
                title: "React introduces new compiler optimizations",
                description:
                    "React's latest update improves rendering performance.",
                url: "https://example.com/react",
                source: "React Blog",
                publishedAt: new Date(),
                category: "TECH",
            },
        ];
    }
}