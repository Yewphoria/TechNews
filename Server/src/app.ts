import express from "express";
import cors from "cors";
import newsletterRoutes from "./modules/newsletter/newsletter.routes";

import { errorMiddleware } from "./middleware/error.middleware";

const app = express();

app.use(newsletterRoutes);
app.use(cors());
app.use(express.json());

app.use(errorMiddleware);

export default app;