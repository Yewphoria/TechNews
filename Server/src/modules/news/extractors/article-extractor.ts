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
        console.log(response);
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

        let imageUrl = dom.window.document.querySelector("meta[property='og:image']")?.getAttribute("content") || "";
        //fallback
        if(!imageUrl) {
            imageUrl = dom.window.document
            .querySelector("img")
            ?.getAttribute("src") ?? "";
        }


        const parsedArticle = reader.parse();
        console.log("Parsed article:", parsedArticle);

        return {
            ...article,
            content: parsedArticle?.textContent?.trim() ?? "",
            imageUrl: imageUrl,
        };

    } catch {
        return {
            ...article,
            content: "",
            imageUrl: "",
        };
    }
}

}