const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const decoder = require("../middlewares/decoder");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "Successfull" });
});
//User Routes
router.post("/user/register", userController.register);
router.post("/user/login", userController.login);
router.get("/user/dashboard",decoder, userController.dashboard)
router.patch("/user/update/:id", decoder, userController.update);
router.post("/user/logout", decoder, userController.logout);

module.exports = router;
