import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { ChatEvents } from "./types";
import socketManager from "./socket-manager";
import cors from 'cors';
import { config } from "dotenv";

if (process.env.NODE_ENV !== "production") {
    config();
}

const app=express();

app.use(cors());

const server=createServer(app); // http server

const io=new Server(server, {
    cors: {
        origin: [process.env.CLIENT_URL as string],
        methods: ["GET", "POST"],
    }
}); // socket.io server

io.on(ChatEvents.CONNECTION, socketManager);

app.get("/", (_: Request, res: Response) => {
    res.send("The express server is up and running.");
});

server.listen(
    process.env.PORT||8000,
    () => console.log("Chat server is up and running.")
);