const axios = require('axios');

// Enter your REST API key obtained from [Your Application] > [App Key]
const REST_API_KEY = '2e2fd5924433bf0466e6a68d949f57e1';


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
        console.error('Image Generation Error:', error.message);
        throw new Error('Error generating image');
    }
}


module.exports = {
    generateImage
  };