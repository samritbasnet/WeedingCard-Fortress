// imageRoute.js

const express = require('express');
const router = express.Router();
const ImageController = require('../controllers/ImageController');

// Route for generating images
router.post('/generateImage', ImageController.generateImage);

module.exports = router;