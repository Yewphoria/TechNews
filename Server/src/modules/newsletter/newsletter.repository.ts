import { NewsletterResponseDto } from "./newsletter.dto";

export class NewsletterRepository {

    private newsletters: NewsletterResponseDto | null = null; // In-memory storage for newsletters

    public async findToday(): Promise<NewsletterResponseDto | null> {  //might return null if no newsletter is found for today
        return this.newsletters;
    }
    
    public async save(newsletter: NewsletterResponseDto): Promise<void> {
        this.newsletters = newsletter;
    }
}