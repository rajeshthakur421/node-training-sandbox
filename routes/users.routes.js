var express = require('express');
var router = express.Router();

const userControllers = require('../controllers/users.controllers');

router.post('/login',userControllers.userLogin);
router.post('/createUser',userControllers.createUser);



module.exports = router;
