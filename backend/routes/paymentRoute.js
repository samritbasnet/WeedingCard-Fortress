
const express = require('express');
const imageController = require('../controllers/paymentController');
const router = express.Router();


    router.post('/checkout-session', imageController.createStripeCheckout);
    router.post('/check-payment-status', imageController.checkPaymentStatus);

module.exports = router;