const express = require("express");
const router = express.Router();
const {line_chart} = require("../Controllers/chart_controller");
router.get('/line_chart',line_chart);   
module.exports = router;