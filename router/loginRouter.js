//external imorts
const express = require('express');


//internal imports
const {getLogin, login, logout} = require('../controller/loginController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const { dologinValidators, doLoginValidationHandler } = require('../middleware/login/loginValidator');
const { redirectLoggedIn } = require('../middleware/common/checkLogin');

const router = express.Router();

//set page title
const Page_Title = "Login";

//login Route
router.get('/', decorateHtmlResponse(Page_Title), redirectLoggedIn, getLogin);
router.post('/', decorateHtmlResponse(Page_Title), dologinValidators, doLoginValidationHandler, login);
router.delete('/', logout);

module.exports = router;
