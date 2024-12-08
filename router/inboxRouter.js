//external imorts
const express = require('express');


//internal imports
const {getInbox} = require('../controller/inboxController')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse');
const {checkLogin} = require('../middleware/common/checkLogin');

const router = express.Router();

//login Route
router.get('/', decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
