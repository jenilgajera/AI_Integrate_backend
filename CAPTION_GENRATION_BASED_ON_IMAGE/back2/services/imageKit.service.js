const imagekit = require("imagekit");

const imagekitService = new imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (file) => {
  return new Promise((resolve, reject) => {
    imagekitService.upload(
      {
        file: file.buffer,
        fileName: `${Date.now()}_image`,
        folder: "songs",
        useUniqueFileName: true,
      },
      (error, result) => {
        if (error) {
          console.error("Image upload failed:", error);
          reject(error);
        } else {
          console.log("Image uploaded successfully:", result);
          resolve(result);
        }
      }
    );
  });
};

module.exports=uploadFile;
