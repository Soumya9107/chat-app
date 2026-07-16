const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data.js"); // adjust path/filename to match your project

const app = express()
dotenv.config();

app.get('/', (req, res) => {
    res.send("API is running successfully");
});

app.get('/api/chat', (req, res) => {
    res.send(chats);
});

app.get('/api/chat/:id', (req, res) => {
    //console.log(req.params.id);
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server started on PORT ${PORT}`));