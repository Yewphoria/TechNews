export interface RawNewsArticleDto {
    title: string;
    description: string;
    url: string;
    source: string;
    publishedAt: Date;
    category: "AI" | "TECH";
    imageUrl?: string;
    
}

export interface ProcessedNewsArticleDto extends RawNewsArticleDto {
    summary: string;
    whyDoesThisMatterToMe: string;
}



export interface ExtractedNewsArticleDto
    extends RawNewsArticleDto {

    content: string;
}