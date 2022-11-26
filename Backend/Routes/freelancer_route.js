const express = require('express');
const router = express.Router();
const multer = require("multer");
const Freelancer = require('../Models/freelancer_model');
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
const { filter_freelancer, search_freelancer, get_freelancers, get_freelancer, register_freelancer, delete_freelancer, update_freelancer } = require('../Controllers/freelancer_controller')
router.get('/get', get_freelancers);
router.get('/get/:id', get_freelancer);
router.post('/register', upload.array('file', 2), register_freelancer);
router.delete('/delete/:id', delete_freelancer);
router.post('/email_duplicate', async (req, res) => {
    let email_dup = await Freelancer.findOne({ email: req.body.email })
    console.log(email_dup)
    if (email_dup)
        if (email_dup.id != req.body.id)
            res.status(200).json({ is_duplicate: true })
        else
            res.status(200).json({ is_duplicate: false })
    else
        res.status(200).json({ is_duplicate: false })
})
router.post('/search', search_freelancer)
router.post('/filter', filter_freelancer)
router.put('/update/:id', upload.array('file', 2), update_freelancer);
module.exports = router;