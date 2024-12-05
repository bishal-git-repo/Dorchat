const createError = require('http-errors');



//404 not found handler
function notfoundHandler(req, res, next){
    next(createError(404,"Your requested content was not found!"))
}


//default error handler
function errorHandler(error, req, res, next){

    res.locals.errors = process.env.NODE_ENV === "development" ? error : {message: error.message};

    res.status(error.status || 500);
    
    if (res.locals.html) {
        //html response
        res.render('error',{
            title:"Error page"
        });
    } else {
        //json response
        res.json(res.locals.errors)
    }
}

module.exports = {
    notfoundHandler,
    errorHandler
}