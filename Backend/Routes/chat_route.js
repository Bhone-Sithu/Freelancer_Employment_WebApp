const express = require("express");
const router = express.Router();
const multer = require("multer");
const {send_message,view_message,send_file} = require("../Controllers/chat_controller");


const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, './Files');
        },
        filename(req, file, cb) {
            cb(null, `${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 10000000 // max file size 1MB = 1000000 bytes
    }
});
router.post('/view_message',view_message);   
router.post('/send_message',send_message);
router.post('/send_file',upload.single('file'),send_file);
module.exports = router;