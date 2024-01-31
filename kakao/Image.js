// Image.js

import React, { useState } from 'react';
import axios from 'axios';

function ImageGenerator() {
  const [imageUrl, setImageUrl] = useState('');
  const [prompt, setPrompt] = useState('wedding card with cat, digital template');
  const [negativePrompt, setNegativePrompt] = useState('paper, cake');

  const generateImage = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generateImage', {
        prompt,
        negativePrompt,
      });

      const generatedImageUrl = response.data;
      setImageUrl(generatedImageUrl);
    } catch (error) {
      console.error('Error generating image:', error.message);
    }
  };

  return (
    <div>
      <h1>Image Generator</h1>

      <div>
        <label htmlFor="prompt">Prompt:</label>
        <input
          type="text"
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="negativePrompt">Negative Prompt:</label>
        <input
          type="text"
          id="negativePrompt"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />
      </div>

      <button onClick={generateImage}>Generate Image</button>

      {imageUrl && (
        <div>
          <h2>Generated Image</h2>
          <img src={imageUrl} alt="Generated Image" />
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
