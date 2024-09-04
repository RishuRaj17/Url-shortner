const express = require("express");
const User = require("../models/userModel");
const {v4:uuidv4} = require("uuid");
const { setUserId } = require("../services/auth");

async function handleUserGetSignUp(req,res) {
    res.render("signUp");
}

async function handleUserSignUp(req,res) {
    const {name, email, password} = await req.body;
    if(
        !name ||
        !email ||
        !password
    ){
        return res
        .status(404)
        .json({msg:"All fields are required!"});
    }

    User.create({
        name,
        email,
        password
    })

    return res
    .status(200)
    .render("login");
}

async function handleGetUserLogin(req,res) {
    return res
    .render("login");
}


async function handlePostUserLogin(req,res){
    const {email, password} = req.body;

    const data = await User.findOne({
        email,
        password
    });


    if(!data){
        return res
        .redirect("/user/signup")
    }

    // const sessionId = uuidv4();

    // setUserId(sessionId,data);
    const token = setUserId(data);
    // res.cookie("uid", sessionId);
    res.cookie("uid",token);

    return res
    .status(200)
    .redirect("/url");
}


module.exports = {
    handleUserSignUp,
    handleUserGetSignUp,
    handleGetUserLogin,
    handlePostUserLogin
}