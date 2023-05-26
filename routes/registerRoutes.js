const router = require("express").Router();
const {
  registerPostController,
  registerGetController,
} = require("../controller/userController");

router.get("/", registerGetController);

router.post("/", registerPostController);

module.exports = router;
