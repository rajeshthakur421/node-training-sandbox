var express = require("express");
var router = express.Router();
const userController = require("../controllers/users.controllers");
const { body } = require("express-validator");

router.post("/login", userController.loginUser);

router.post("/getAll", userController.getAll);

router.post(
  "/create",
  [
    body("Name")
      .notEmpty()
      .withMessage("Namee is required")
      .isAlpha()
      .withMessage("Name must be in alphabets only"),
    body("Mobile")
      .notEmpty()
      .withMessage("Mobile is required")
      .isLength({ min: 10, max: 12 })
      .withMessage("Please enter valid mobile number"),
  ],
  userController.createUser
);

router.post("/update/:id", userController.updateUser);
router.post("/delete/:id", userController.deleteUser);
router.post("/search/:id", userController.searchUser);

module.exports = router;
