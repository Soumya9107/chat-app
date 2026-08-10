//const express = require('express');
import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import User from "./models/user_model.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cors({ origin: FRONTEND_URL, credentials: true}));
app.use(clerkMiddleware());

app.get("/health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on PORT:', PORT);
});