const Employer = require('../Models/employer_model');
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
const {search_employer, get_employers, get_employer, register_employer, delete_employer, update_employer } = require('../Controllers/employer_controller')
router.get('/get', get_employers);
router.get('/get/:id', get_employer);
router.post('/register', upload.single('file'), register_employer);
router.put('/update/:id',  upload.single('file'), update_employer);
router.delete('/delete/:id', delete_employer);
router.post('/email_duplicate', async (req, res) => {
    let email_dup = await Employer.findOne({ email: req.body.email })
    console.log(email_dup)
    if (email_dup) {
        if (email_dup._id == req.body.id)
            res.status(200).json({ is_duplicate: false })
        else
            res.status(200).json({ is_duplicate: true })
    }

    else
        res.status(200).json({ is_duplicate: false })
})
router.post('/search', search_employer);
module.exports = router;