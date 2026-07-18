const mongoose = require('mongoose');

const mesageModel = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "chatModel" },
},
    {
        timeStamps: true,
    }
);

const Message = mongoose.model("Message", messageModel);

module.exports = Message;