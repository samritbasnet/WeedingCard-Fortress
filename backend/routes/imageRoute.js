// routes/imageRoutes.js

const express = require('express');
const imageController = require('../controllers/ImageController');
const router = express.Router();


router.post('/generateImage', imageController.generateImage);

// router.post('/generateImage', async (req, res) => {
//     try {
//         const { prompt, width, height } = req.body;
//         const imageUrls = await generateImage(prompt, width, height);
//         res.json({ imageUrls });
//     } catch (error) {
//         console.error('Route Error:', error.message);
//         res.status(500).json({ error: 'Error generating image' });
//     }
// });

module.exports = router;