const express = require('express');
const router = express.Router(); 
const multer = require("multer");
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'Backend/Files/User');
        },
        filename(req, file, cb) {
            cb(null, `_${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 10000000 // max file size 1MB = 1000000 bytes
    }
});
const {get_freelancers,get_freelancer,register_freelancer,delete_freelancer,update_freelancer} = require('../Controllers/freelancer_controller')
router.get('/get',get_freelancers);
router.get('/get/:id',get_freelancer);
router.post('/register',upload.array('file',2),register_freelancer);
router.put('/update/:id',update_freelancer);
router.delete('/delete/:id',delete_freelancer);
module.exports = router;