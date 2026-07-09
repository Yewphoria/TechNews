import { NewsSource } from "./news-source";

export const AI_NEWS_SOURCES: NewsSource[] = [
    {
        name: "TechCrunch AI",
        rssUrl: "https://techcrunch.com/category/artificial-intelligence/feed/",
        category: "AI",
        priority: 1,
    },
    {
        name: "The Decoder",
        rssUrl: "https://the-decoder.com/feed/",
        category: "AI",
        priority: 1,
    },
    {
        name: "VentureBeat AI",
        rssUrl: "https://venturebeat.com/ai/feed/",
        category: "AI",
        priority: 2,
    },
    {
        name: "Hugging Face",
        rssUrl: "https://huggingface.co/blog/feed.xml",
        category: "AI",
        priority: 2,
    },
];