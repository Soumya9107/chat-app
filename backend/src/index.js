//const express = require('express');
import express from "express";
import cors from "cors";
import "dotenv/config";

import fs from "fs";
import path from "path";

import { clerkMiddleware } from "@clerk/express";
import User from "./models/user_model.js";
import job from "./lib/cron.js";
import { connectDB } from "./lib/db.js";
import clerkWebHook from "./webhooks/clerk_webhook.js";
import authRoutes from "./routes/auth_route.js";

const app = express();

const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

const publicDir = path.join(process.cwd(), "public");

app.use("api/webhooks/clerk", express.raw({ type: "application/json" }), clerkWebHook);

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

app.use("api/auth", authRoutes);

if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir));

    app.get("/{*any}", (req, res, next) => {
        res.sendFile(path.join(publicDir, "index.html"), (err) => next(err));
    });
}
app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on PORT:', PORT);

    if (process.env.NODE_ENV === "production") job.start();
});