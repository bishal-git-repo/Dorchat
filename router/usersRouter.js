//external imorts
const express = require('express');


//internal imports
const {getUsers} = require('../controller/usersController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')

const router = express.Router();

//login Route
router.get('/', decorateHtmlResponse("User"),getUsers);

module.exports = router;
