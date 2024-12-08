//external imorts
const express = require('express');
const {check} = require("express-validator")

//internal imports
const {getUsers, addUser, removeUser} = require('../controller/usersController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const avatarUpload = require("../middleware/users/avatarUpload");
const { addUserValidators, addUserValidationHandler } = require('../middleware/users/userValidators');
const {checkLogin} = require('../middleware/common/checkLogin');

const router = express.Router();

//login Route
router.get('/', decorateHtmlResponse("User"), checkLogin, getUsers);

//user add route
router.post('/', checkLogin, avatarUpload, addUserValidators, addUserValidationHandler, addUser)

//user remove route
router.delete("/:id", removeUser)

module.exports = router;
