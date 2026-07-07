import { NextFunction, Request, Response } from "express";
import { AppError } from "../shared/errors/AppError";

export const errorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });

        return;
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};