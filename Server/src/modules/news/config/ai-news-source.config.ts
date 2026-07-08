import { NewsSource } from "./news-source";

export const AI_NEWS_SOURCES: NewsSource[] = [
    {
        name: "OpenAI",
        rssUrl: "https://openai.com/news/rss.xml",
        category: "AI",
        priority: 1,
    },
    {
        name: "Claude Code",
        rssUrl: "https://raw.githubusercontent.com/leontloveless/ai-rss-feeds/main/feeds/claude-code-releases.xml",
        category: "AI",
        priority: 1,
    },
    {
        name: "Google AI",
        rssUrl: "https://deepmind.google/blog/rss.xml",
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