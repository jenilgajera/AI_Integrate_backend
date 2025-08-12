const express = require("express");
const multer = require("multer");
const postController = require("../controllers/posts.controller");
const authMiddleware = require("../middleware/auth.middleware");

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.post("/", upload.single("image"), authMiddleware, postController.ppost);

module.exports = router;
