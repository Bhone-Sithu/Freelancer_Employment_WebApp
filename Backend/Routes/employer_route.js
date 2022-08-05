const express = require('express');
const router = express.Router(); 
const {get_employers,get_employer,register_employer,delete_employer,update_employer} = require('../Controllers/employer_controller')
router.get('/get',get_employers);
router.get('/get/:id',get_employer);
router.post('/register',register_employer);
router.put('/update/:id',update_employer);
router.delete('/delete/:id',delete_employer);
module.exports = router;