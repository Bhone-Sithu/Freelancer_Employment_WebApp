const express = require("express");
const router = express.Router();
const {send_message,view_message} = require("../Controllers/chat_controller");
router.post('/view_message',view_message);   
router.post('/send_message',send_message);
module.exports = router;