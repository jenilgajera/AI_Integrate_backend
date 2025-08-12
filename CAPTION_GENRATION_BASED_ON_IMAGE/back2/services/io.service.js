const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
}

main();

async function genrateCaption(base64ImageFile) {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
        you are an expert in genrating caption for images.
        you genrate the single caption for the iamge.
        your caption should be sort and conscise.
        you use hashtags and emojis in the caption.
        genrate caption in tapori language.
        create asthetic caption
        caption should be in dark humor.
        `,
    },
  });
  return response.text;
}

module.exports = genrateCaption;
