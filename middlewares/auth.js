const { getUserId } = require("../services/auth");

async function restictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if(!userUid){
        return res.redirect("/user/login");
    }

    const user = getUserId(userUid);

    if(!user){
        return res.redirect("/user/login");
    }

    req.user = user;
    next();
}

module.exports = {
    restictToLoggedInUserOnly
};