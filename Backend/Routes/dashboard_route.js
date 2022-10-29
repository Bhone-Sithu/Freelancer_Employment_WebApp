const express = require('express');
const router = express.Router(); 
const {give_rating} = require('../Controllers/rating_controller')
const { create_dashboard, update_dashboard, get_dashboard } = require('../Controllers/dashboard_controller')
router.get('/get/:id',get_dashboard);
router.post('/create_dashboard',create_dashboard);
router.put('/update/:id',update_dashboard);
router.put('/rate/:id',give_rating);
module.exports = router;