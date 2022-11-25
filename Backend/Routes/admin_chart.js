const express = require("express");
const router = express.Router();
const {user_count,skillset} = require("../Controllers/chart_controller");
router.post('/user_count',user_count);   
router.post('/skillset',skillset);   
module.exports = router;