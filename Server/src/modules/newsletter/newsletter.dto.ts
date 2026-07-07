export interface NewsletterArticleDto {
    id: number;
    title: string;
    summary: string;
    whyDoesThisMatterToMe: string;
}

export interface NewsletterResponseDto {
    date: string;
    generatedAt: string;
    articles: NewsletterArticleDto[];
}