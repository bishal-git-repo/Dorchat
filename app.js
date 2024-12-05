//external imports
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
const cookieParser = require('cookie-parser');

//internal imports
const {notfoundHandler, errorHandler} = require('./middleware/common/errorHandler');

const loginRouter = require('./router/loginRouter');
const usersRouter = require('./router/usersRouter');
const inboxRouter = require('./router/inboxRouter');

//create express app
const app = express();

//config dotenv
dotenv.config();


//database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
.then(()=> console.log("database connection successfull"))
.catch((error) => console.log(error));


//request parsers
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// set view engine
app.set("view engine", "ejs");


//set static folder
app.use(express.static(path.join(__dirname,"public")));


//parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

//routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);


//404 not found handler
app.use(notfoundHandler)


//common error handler
app.use(errorHandler)


//app listen
app.listen(process.env.PORT,()=>{
    console.log(`app listening to port ${process.env.PORT}`);
})