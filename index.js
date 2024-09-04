const express = require("express");
const { connectMongoDB } = require("./connection");
const { router } = require("./routes/pageRoute");
const userRoutes = require("./routes/userRoute");
const path = require("path");
const cookieParser = require("cookie-parser");
const {restictToLoggedInUserOnly} = require("./middlewares/auth");

const app = express();
const PORT = 8000;
const mongoUrl = "mongodb://127.0.0.1:27017/rishu";

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT,()=>console.log("Server Created!"));
connectMongoDB(mongoUrl);

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/url", restictToLoggedInUserOnly,router); 
app.use("/user", userRoutes);
