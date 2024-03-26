
const express = require('express');
const imageController = require('../controllers/paymentController');
const router = express.Router();


router.post('/checkout-session', imageController.createStripeCheckout);

module.exports = router;