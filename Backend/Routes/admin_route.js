const express = require('express');
const router = express.Router(); 
const {approve,
    get_admins,
    get_admin,
    register_admin,
    get_unapproved} = require('../Controllers/admin_controller')
router.get('/get',get_admins);
router.post('/register',register_admin);
router.get('/get/:id',get_admin);
router.get('/get_unapproved',get_unapproved);
router.put('/approve/:id',approve);

module.exports = router;