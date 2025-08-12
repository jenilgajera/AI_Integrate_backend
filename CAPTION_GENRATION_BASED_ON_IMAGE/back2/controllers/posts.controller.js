const postModel = require("../models/posts.model");
const uploadFile = require("../services/imageKit.service");
const genrateCaption = require("../services/io.service");

const postController = {
  ppost: async (req, res) => {
    try {
      const file = req.file;
      console.log("file received =>", file);

      if (!file) {
        return res.status(400).json({ message: "Image is required." });
      }

      const base64Image = Buffer.from(file.buffer).toString("base64");

      const caption = await genrateCaption(base64Image);
      console.log("Generated Caption =>", caption);

      const uploadedFile = await uploadFile(file); // optional
      const newPost = await postModel.create({
        image: uploadedFile?.url || "https://dummyimage.com/600x400",
        caption,
        user: req.user._id
      });

      res.status(201).json({
        message: "Post created successfully",
        post: newPost,
      });
    } catch (err) {
      console.error("Error creating post:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};

module.exports = postController;
