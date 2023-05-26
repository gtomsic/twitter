const router = require("express").Router();
const {
  loginGetController,
  loginPostController,
} = require("../controller/userController");

router.get("/", loginGetController);
router.post("/", loginPostController);

module.exports = router;
