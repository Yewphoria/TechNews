import { NewsSource } from "./news-source";

export const TECH_NEWS_SOURCES: NewsSource[] = [
    {
        name: "Reuters",
        rssUrl: "https://feeds.reuters.com/reuters/technologyNews",
        category: "TECH",
        priority: 1,
    },
    {
        name: "TechCrunch",
        rssUrl: "https://techcrunch.com/feed/",
        category: "TECH",
        priority: 1,
    },
    {
        name: "The Verge",
        rssUrl: "https://www.theverge.com/rss/index.xml",
        category: "TECH",
        priority: 2,
    },
    {
        name: "InfoQ",
        rssUrl: "https://feed.infoq.com/",
        category: "TECH",
        priority: 2,
    },
];