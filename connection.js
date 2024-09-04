const mongoose = require("mongoose");

async function connectMongoDB(url) {
return mongoose
.connect(url)
.then(()=>console.log("Database Connected!"))
.catch((err)=>console.log("Error Occured! ",err));
}

module.exports = {
    connectMongoDB
}