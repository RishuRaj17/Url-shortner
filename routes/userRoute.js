const express = require("express");
const router = express.Router();

const { 
    handleUserSignUp, 
    handleUserGetSignUp, 
    handleGetUserLogin,
    handlePostUserLogin
} = require("../controlers/userControls");

router.route("/signup")
.get(handleUserGetSignUp)
.post(handleUserSignUp);

router.route("/login")
.get(handleGetUserLogin)
.post(handlePostUserLogin);

module.exports = router;