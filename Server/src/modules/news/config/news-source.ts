export interface NewsSource {
    name: string;
    rssUrl: string;
    category: "AI" | "TECH";
    priority: number;
}