import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
	res.status(400).json({ errors: errors.array() });
	return;
  }
  next();
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
};
