// routes/imageRoutes.js

const express = require('express');
const imageController = require('../controllers/ImageController');
const router = express.Router();


router.post('/generateImage', imageController.generateImage);

module.exports = router;