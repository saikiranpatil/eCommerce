const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // wrong mongodb Id error 
    if(err.name==="CastError"){
        const message = `Resourse not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message,404);
    }

    // mangoose duplicate key error
    if(err.code===11000){
        const message = `duplicate ${Object.keys(err.keyValue)} has been entered`;
        err = new ErrorHandler(message,400);
    }

    // wrong JWT Error 
    if(err.name==="JsonWebTokenError"){
        const message = `Invalid JSON Web Token, Try Again`;
        err = new ErrorHandler(message,400);
    }

    // JWT Expire error 
    if(err.name==="TokenExpiredError"){
        const message = `JSON Web Token is Expired, Try Again`;
        err = new ErrorHandler(message,400);
    }

    console.log(err)

    res.status(err.statusCode).json({
        success:false,
        error:err.message
    })
};