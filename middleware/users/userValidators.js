const {check, validationResult} = require("express-validator")
const createError = require("http-errors");
const {unlink} = require("fs");

//internal imports
const People = require("../../models/people");
const path = require("path");


//add user
const addUserValidators = [
    check("name").isLength({min: 1}).withMessage("Name is required").isAlpha("en-US", {ignore: " -"}).withMessage("Name must not contain anything other than alphabet").trim(),

    check("email").isEmail().withMessage("Invalid email address").trim().custom(async (value)=>{
        try {
            const user = await People.findOne({email: value})
            if (user) {
                throw createError("Email aleady is use!")
            }
        } catch (error) {
            throw createError(error.message)
        }
    }),

    check("mobile").isMobilePhone("en-IN", {strictMode: true}).withMessage("Mobile number must be a valid Indian mobile number").custom(async (value)=>{
        try {
            const user = await People.findOne({mobile: value});
            if (user) {
                throw createError("mobile already is use!")
            }
        } catch (error) {
            throw createError(error.message)
        }
    }),

    check("password").isStrongPassword().withMessage("Password must be at least 8 characters long & should contain at least 1 lowerscase, 1 uppercase, 1 number & 1 symobl"),
];

const addUserValidationHandler = function (req, res, next){
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        // remove uploaded files
        if (req.files.length > 0) {
            const {filename} = req.files[0];
            unlink(
                path.join(__dirname, `/../public/uploads/avatars/${filename}`),
                (error)=>{
                    if (error) {
                        console.log(error);
                        
                    }
                }
            )
        }

        //response the errors
        res.status(500).json({
            errors: mappedErrors,
        })
    }
}

module.exports = {
    addUserValidators,
    addUserValidationHandler
}