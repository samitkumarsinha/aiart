import { FormData } from 'formdata-node';
import fetch from 'node-fetch';
import fs from "fs";
const API_KEY = 'my api key';

async function generateImage(prompt) {
  const form = new FormData();
  form.append('prompt', prompt);

  const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
    method: 'POST',
    headers: {
      'x-api-key': API_KEY
    },
    body: form
  });

  const buffer = await response.arrayBuffer();

  return buffer;
}

async function main() {
  const prompt = `humanoid apparition in the dark ominous, horror, eerie, goosebumps, high quality, 8k`;
  let buffer = await generateImage(prompt);

  // Write the buffer to a file
  
  buffer = Buffer.from(buffer);
  await fs.promises.writeFile('image.png', buffer);

  console.log('Image generated successfully!');
}

main();
