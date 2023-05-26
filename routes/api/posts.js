const {
  postPostController,
  getPostController,
} = require("../../controller/postController");

const router = require("express").Router();

router.get("/", getPostController);
router.post("/", postPostController);

module.exports = router;
