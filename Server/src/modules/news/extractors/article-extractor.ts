import { Readability } from "@mozilla/readability";
import { JSDOM } from 'jsdom';
import { ExtractedNewsArticleDto } from "../news.dto";
import { RawNewsArticleDto } from "../news.dto";

export class ArticleExtractor {

    public async extract(
    article: RawNewsArticleDto
): Promise<ExtractedNewsArticleDto> {

    try {
        const response = await fetch(article.url);

        if (!response.ok) {
            return {
                ...article,
                content: "",
            };
        }

        const html = await response.text();

        const dom = new JSDOM(html, {
            url: article.url,
        });

        const reader = new Readability(
            dom.window.document
        );

        const parsedArticle = reader.parse();

        return {
            ...article,
            content: parsedArticle?.textContent?.trim() ?? "",
        };

    } catch {
        return {
            ...article,
            content: "",
        };
    }
}

}