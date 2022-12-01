var express = require("express");
var router = express.Router();
const userController = require("../controllers/users.controllers");
/* GET users listing. */

router.post("/", userController.getAll);
router.post("/create", userController.createUser);
router.post("/update/:id", userController.updateUser);
router.post("/delete/:id", userController.deleteUser);
router.post("/search/:id", userController.searchUser);

module.exports = router;
