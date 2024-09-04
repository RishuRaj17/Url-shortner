const mongoose = require("mongoose");

const url = new mongoose.Schema({
    shortId:{
        type:String,
        unique:true,
        required:true
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitedHistory:[
        {}
    ],
    createdBy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "registeredusers"
    }

},{timestamps:true});

const URL = mongoose.model("customUrlShortner",url);

module.exports = {URL};