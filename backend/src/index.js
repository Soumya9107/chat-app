//const express = require('express');
import express from 'express';
import "dotenv/config";
import User from "./models/user_model.js";
import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT;

app.get("health", (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
});

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on PORT:', PORT);
});