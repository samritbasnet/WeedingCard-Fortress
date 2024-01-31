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
async function t2i(prompt, negativePrompt, imageformat, returntype) {
    try {
        const response = await axios.post(
            'https://api.kakaobrain.com/v2/inference/karlo/t2i',
            {
                prompt,
                negative_prompt: negativePrompt,
                image_format: imageformat,
                return_type : returntype
            },
            {
                headers: {
                    'Authorization': `KakaoAK ${REST_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        // Convert the response to JSON format
        const responseData = response.data;

        // Extract the image URL from the response
        const imageUrl = responseData.images[0].image;
        console.log('Image URL:', imageUrl);
        console.log(responseData.images[0]);
        

        // Send the image URL to the client
        return imageUrl;
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
    "paper, cake, low quality, low contrast, draft, amateur, cut off, cropped, frame, object out of frame, out of frame, body out of frame, text, letter, signature, watermark";
    const imageformat = "png";
    const returntype = "url";

    const imageUrl = await t2i(prompt, negativePrompt, imageformat, returntype);

    if (imageUrl) {
        res.json({ imageUrl }); // Sending JSON response
    } else {
        // If image generation fails, send an error response
        res.status(500).send('Error generating image');
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
