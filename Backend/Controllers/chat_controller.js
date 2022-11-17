const Chat = require("../Models/chat_model");
const path = require("path");
const multer = require("multer");

const send_message = async (req, res) => {
    const message = {
        project_id: req.body.project_id,
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        content: req.body.content,
        timestamp: Date.now()
    }
    const created = await Chat.create(message);
    res.status(201).json(created)
}
const send_file = async (req, res) => {
    const message = {
        project_id: req.body.project_id,
        sender_id: req.body.sender_id,
        receiver_id: req.body.receiver_id,
        content: "$file",
        file_path:req.file.path.substring(8),
        file_type:req.file.mimetype,
        timestamp: Date.now()
    }
    const created = await Chat.create(message);
    res.status(201).json(created)

}
const view_message = async (req, res) => {
    const messages = await Chat.find({
        $or: [
            {
                project_id: req.body.project_id,
                sender_id: req.body.sender_id,
                receiver_id: req.body.receiver_id
            },
            {
                project_id: req.body.project_id,
                sender_id: req.body.receiver_id,
                receiver_id: req.body.sender_id
            }
        ]

    });
    res.status(200).json(messages)
}
const delete_message = async(req,res) => {
    console.log("hi")
    const deleted = await Chat.findByIdAndDelete(req.params.id);
    res.status(200).json({deleted});
}
module.exports = {
    send_message,
    view_message,
    send_file,
    delete_message
}