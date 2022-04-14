const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    const token = req.cookies.token;
    
    if(!token){
        return next(new ErrorHandler("Please Login to access the resource",401));
    }

    const decodedData = jsonwebtoken.verify(token,process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id)

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            next(new ErrorHandler(`Role:${req.user.role} is not authorized to acess this resource`,403));
        }
        next();
    }
}