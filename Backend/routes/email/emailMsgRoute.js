const express = require("express");
const { sendEmailMsg } = require("../../controllers/emailMsg/emailMsgCntrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, sendEmailMsg);

module.exports = router;
