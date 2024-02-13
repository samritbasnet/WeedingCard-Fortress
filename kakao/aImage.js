const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

// Enter your REST API key obtained from [Your Application] > [App Key]
const REST_API_KEY = '2e2fd5924433bf0466e6a68d949f57e1';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Request to generate an image
async function t2i(prompt, negativePrompt, imageformat, returntype, width, height, imageQuality, samples) {
    try {
        const response = await axios.post(
            'https://api.kakaobrain.com/v2/inference/karlo/t2i',
            {
                prompt,
                negative_prompt: negativePrompt,
                image_format: imageformat,
                return_type : returntype,
                width, 
                height,
                image_quality: imageQuality,
                samples
            },
            {
                headers: {
                    'Authorization': `KakaoAK ${REST_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const responesData = response.data;

        const imageUrls = responesData.images.map(image => image.image);
        console.log('Image URLs: ', imageUrls);

        return imageUrls;
        
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// Express route to handle image request
app.get('/', async (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


// Handle form submission
app.post('/generateImage', async (req, res) => {
    const prompt = req.body.prompt;
    const negativePrompt = 
    "paper, cake, low quality, low contrast, draft, amateur, cut off, cropped, frame, object out of frame, out of frame, body out of frame, text, letter, signature, watermark, blood";
    const imageformat = "png";
    const returntype = "url";
    const imageQuality = 80;
    const samples = 8;

    console.log("Input:", parseInt(req.body.width));
    console.log("Input:", parseInt(req.body.height));
    const width = parseInt(req.body.width);
    const height = parseInt(req.body.height);
    console.log("Parsed Width:", width);
    console.log("Parsed Width:", height);

    console.log(imageQuality);
    console.log(negativePrompt);
    console.log("Samples:", samples);


    const imageUrls = await t2i(prompt, negativePrompt, imageformat, returntype, width, height, imageQuality, samples);

    if (imageUrls && imageUrls.length > 0) {
        res.json({ imageUrls }); // Sending JSON response with multiple image URLs
    } else {
        // If image generation fails, send an error response
        res.status(500).send('Error generating image');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
