import { Request, Response} from "express";
import { NewsletterService } from "./newsletter.service";

//get the request and use the service (controller is the middle man between the request)
export class NewsletterController {

    constructor(
        private readonly newsletterService: NewsletterService
    ) {}

    public getTodayAINewsletter = async (
        req: Request,
        res: Response,
       
    ): Promise<void> => {

            const newsletter = await this.newsletterService.getTodayNewsletter("AI");
            res.json(newsletter);
       
    };

     public getTodayTechNewsletter = async (
        req: Request,
        res: Response,
       
    ): Promise<void> => {

            const newsletter = await this.newsletterService.getTodayNewsletter("TECH");
            res.json(newsletter);
       
    };
}