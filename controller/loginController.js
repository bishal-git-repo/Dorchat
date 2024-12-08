//external modules
const bcrypt = require('bcrypt');
const People = require("../models/people");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const createError = require("http-errors");


//get login page
function getLogin(req, res, next){
    res.render("index");
}


//user login check
async function login(req, res, next){
    try {
        //find the user using mail or username
        const user = await People.findOne({
            $or: [{mobile: req.body.username},{email: req.body.username}]
        });

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            );

            //prepare the user object to generate the token
            if (isValidPassword) {
                let userObject = {
                    username: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role
                };

                //generate the jwt token
                const token = jwt.sign(userObject, process.env.JWT_SECRET,{
                    expiresIn: process.env.JWT_EXPIRY
                });

                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRY,
                    httpOnly: true,
                    signed: true
                });

                res.locals.loggedInUser = userObject;

                res.render("inbox")
            } else {
                throw createError("Login failed! Please try again")
            }
        } else {
            throw createError("Login failed! Please try again")
        }
    } catch (error) {
        res.render("index",{
            data:{
                username: req.body.username,
            },
            errors:{
                common:{
                    msg:error.message,
                }
            }
        })
    }
};


//do logout
function logout(req, res){
    res.clearCookie(process.env.COOKIE_NAME);
    res.send("Logged out")
}

module.exports = {
    getLogin,
    login,
    logout,
}