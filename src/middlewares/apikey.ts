import { Request, Response, NextFunction } from "express";

export const validateApiKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header("x-api-key");

  const API_KEY = process.env.API_KEY ?? "default-secret";

  if (!apiKey) {
    return res.status(401).json({ message: "API key is missing" });
  }

  if (apiKey !== API_KEY) {
    return res.status(403).json({ message: "Invalid API key" });
  }

  next();
};
