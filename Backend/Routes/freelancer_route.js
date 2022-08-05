const express = require('express');
const router = express.Router(); 
const {get_freelancers,get_freelancer,register_freelancer,delete_freelancer,update_freelancer} = require('../Controllers/freelancer_controller')
router.get('/get',get_freelancers);
router.get('/get/:id',get_freelancer);
router.post('/register',register_freelancer);
router.put('/update/:id',update_freelancer);
router.delete('/delete/:id',delete_freelancer);
module.exports = router;