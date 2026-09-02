import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const allowedOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

const io = new Server(server, { cors: { origin: [allowedOrigin] } });

function getReceiverSocketId(receiverId) { 
    return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        if (userId) delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { app, server, io, getReceiverSocketId };