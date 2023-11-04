import fetch from "node-fetch";
import Replicate from "replicate";
import fs from "fs";

async function downloadImage(url, filename) {
  const response = await fetch(url);
  if (response.ok) {
    let buffer = await response.arrayBuffer();
    buffer = Buffer.from(buffer);
    fs.writeFileSync(filename, buffer);
    console.log("Image downloaded successfully!");
  } else {
    console.error("Failed to download the image");
  }
}

const replicate = new Replicate({
  auth: "my api key",
});

const prompt = `
a girl in a coat and boots walking in a beautiful snowy landscape, cottages, happy children, festival mood, an anime drawing, trending on pixiv, pink hoodie, portrait of a cute girl, 2022 anime style, hat and hoodie, pastel tones
`;

replicate
  .run(
    "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
    {
      input: {
        prompt: prompt,
        negative_prompt:
          "ugly, soft, blurry, out of focus, low quality, garish, distorted, disfigured",
        width: 768,
        height: 1024,
        num_inference_steps: 50,
        scheduler: "DPMSolverMultistep",//"DDIM","DPMSolverMultistep","HeunDiscrete","KarrasDPM","K_EULER_ANCESTRAL","K_EULER","PNDM"
        guidance_scale: 7.5,
        refine: "expert_ensemble_refiner",
        high_noise_frac: 0.8,
      },
    }
  )
  .then(async (output) => {
    await downloadImage(output, Math.random() + ".png");
  });
