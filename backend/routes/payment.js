const express = require("express")
const router = express.Router();
const { initializePayment } = require('../controllers/payment/paymentController')

router.post('/payment/initialize', initializePayment);
// router.post('/payment/verify', verifyPayment);

// router.post('/payment/webhook', webhook);

module.exports = router;