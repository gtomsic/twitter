const router = require("express").Router();
const { logoutGetController } = require("../controller/userController");

router.get("/logout", logoutGetController);

module.exports = router;
