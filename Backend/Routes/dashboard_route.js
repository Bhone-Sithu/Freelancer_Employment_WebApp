const express = require('express');
const multer = require("multer");
const router = express.Router();
const { give_rating } = require('../Controllers/rating_controller')
const { create_dashboard, update_dashboard, get_dashboard,upload_file } = require('../Controllers/dashboard_controller')

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'Backend/Files/Dashboard');
        },
        filename(req, file, cb) {
            cb(null, `_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 10000000 // max file size 1MB = 1000000 bytes
    }
});
router.get('/get/:id', get_dashboard);
router.post('/create_dashboard', create_dashboard);
router.put('/update/:id', update_dashboard);
router.put('/upload/:id',upload.single('file'), upload_file);
router.put('/rate/:id', give_rating);
module.exports = router;