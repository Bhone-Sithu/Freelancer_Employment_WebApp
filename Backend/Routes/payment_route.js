const express = require('express');
const router = express.Router(); 
const {topup,withdraw,transfer, get_payment} = require('../Controllers/payment_controller')

router.put('/topup/:id',topup);
router.put('/withdraw/:id',withdraw);
router.put('/transfer',transfer)
router.get('/get/:id',get_payment)

module.exports = router;