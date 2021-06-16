import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import './database';
import { routes } from "./routes";
import { AppError } from "./errors/AppError";

const app = express();

app.use(express.json());

app.use(routes);

// app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
//   if(error instanceof AppError) {
//   }
// });

export { app };