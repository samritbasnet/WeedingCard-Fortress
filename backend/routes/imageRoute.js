// routes/imageRoutes.js

const express = require('express');
const { generateImage } = require('./controllers/imageController');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

router.post('/generateImage', async (req, res) => {
    try {
        const { prompt, width, height } = req.body;
        const imageUrls = await generateImage(prompt, width, height);
        res.json({ imageUrls });
    } catch (error) {
        console.error('Route Error:', error.message);
        res.status(500).json({ error: 'Error generating image' });
    }
});

module.exports = router;