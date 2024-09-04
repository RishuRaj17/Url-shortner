const express =  require("express");
const { 
    handleGetUrl, 
    handleGenerateShortUrl, 
    handleRedirectUrl, 
    handleAnalytics 
}  = require("../controlers/pageControls");

const router = express.Router();

router.route("/")
.get(handleGetUrl)
.post(handleGenerateShortUrl);

router.get("/:id",handleRedirectUrl);
// router.get("/analytics/:id",handleAnalytics);

module.exports = {
    router
}