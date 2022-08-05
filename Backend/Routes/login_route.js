const express = require('express');
const router = express.Router(); 
const login = require('../Controllers/login_controller')
router.get('/',login);

module.exports = router;