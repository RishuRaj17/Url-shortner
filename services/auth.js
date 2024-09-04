const sessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secretKey = "rishu@1234";

// function setUserId(sessionId,user){
//     return sessionIdToUserMap.set(sessionId,user);
// }

function setUserId(user){
    return  jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email
        },secretKey);
}

// function getUserId(sessionId){
//     return sessionIdToUserMap.get(sessionId);
// }


function getUserId(token){
    try{
        return jwt.verify(token,secretKey);
} catch (err) {
    console.error("Invalid or expired token:", err.message);
    return null;
}
} 

module.exports = {
    setUserId,
    getUserId
}