const express = require('express');
const router = express.Router(); 
const login = require('../Controllers/login_controller')
router.post('/',login);

module.exports = router;