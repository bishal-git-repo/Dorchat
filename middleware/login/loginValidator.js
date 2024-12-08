//external modules
const {check, validationResult} = require("express-validator");

const dologinValidators = [
    check("username").isLength({min: 1}).withMessage("mobile or email is required"),
    check("password").isLength({min: 1}).withMessage("Password is required"),
];


const doLoginValidationHandler = function(req, res, next){
    const errors = validationResult(req);
    const mappedErrors = errors.mapped();
    if (Object.keys(mappedErrors).length === 0) {
        next()
    } else {
        res.render("index",{
            data:{
                username: req.body.username,
            },
            errors: mappedErrors,
        })
    }
}

module.exports = {
    dologinValidators,
    doLoginValidationHandler
}