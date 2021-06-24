import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import './database';
import { routes } from "./routes";
import { AppError } from "./errors/AppError";
import path from "path";

const app = express();

// faz com que a nossa aplicação entenda html
app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

const http = createServer(app);

const io = new Server(http);
io.on("connection", (socket: Socket) => {
  console.log("Conectou em ",socket.id);
})

app.use(express.json());

app.use(routes);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({message: error.message});
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server ${error.message}`});
});

export { http, io };