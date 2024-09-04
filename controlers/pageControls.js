const express =  require("express");
const mongoose = require("mongoose");
const { URL } = require("../models/modelSchema");
const shortid = require("shortid");

async function handleGetUrl(req,res) {
    const data = await URL.find(
        {
            createdBy : req.user._id
        }
    );

    console.log(data);

    return res.render("home",{
        allUrls: data
    })
}

async function handleGenerateShortUrl(req, res) {
    const data = await req.body;
    if( !data || !data.url ){
        return res
        .status(400)
        .redirect("/url");
    }

    const generatedId = shortid.generate();

    const result = await URL.create({
        shortId:generatedId,
        redirectUrl: data.url,
        createdBy: req.user._id
    })

    const user = await URL.find(
        {
            createdBy : req.user._id
        }
    );

    return res
    .status(200)
    .render("home",{
        shortUrl:`localhost:8000/url/${generatedId}`,
        allUrls: user
    })

    
}

async function handleRedirectUrl(req,res) {
    const data = await URL.findOneAndUpdate(
        {shortId:req.params.id},
        {
            $push:{
                visitedHistory:{
                    TimeStamp : Date.now(),
                }
            }
        }
    );

    if(!data){
        return res.status(404).json({msg:"Inavlid Url!"});
    }
    res.redirect(data.redirectUrl);
}

async function handleAnalytics(req,res) {
    const data = await URL.find(
        {
            createdBy : req.user._id
        }
    );

    console.log(data);

    return res.render("home",{
        allUrls: data
    })
}

module.exports = {
    handleAnalytics,
    handleGenerateShortUrl,
    handleGetUrl,
    handleRedirectUrl
}