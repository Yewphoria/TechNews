export interface RawNewsArticleDto {
    title: string;
    description: string;
    url: string;
    source: string;
    publishedAt: Date;
    category: "AI" | "TECH";
}

export interface processedNewsArticleDto extends RawNewsArticleDto {
    summary: string;
    whyDoesThisMatterToMe: string;
}