const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../model/orderModel");
const Product = require("../model/productModel")
const ErrorHandler = require("../utils/errorHandler");

// create order
exports.createOrder = catchAsyncError(async (req, res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    console.log(req.body);
    

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(200).json({
        sucess:"true",
        order
    })
})

// get single order
exports.getSingleOrder = catchAsyncError( async (req, res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order) {
        return next(new ErrorHandler("Order Not Found",404));
    }

    res.status(200).json({
        sucess:"true",
        order
    })
})

// get loggedIn user order
exports.myOrder = catchAsyncError( async (req, res,next) => {
    const order = await Order.find({user:req.user._id});

    res.status(200).json({
        sucess:"true",
        order
    })
})

// get all orders for admin
exports.allOrdersForAdmin = catchAsyncError(async (req, res,next) => {

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach((order) =>{
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        sucess:"true",
        totalAmount,
        orders
    })
})

// update order for admin
exports.updateOrder = catchAsyncError(async (req, res,next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found",400));
    }

    if(order.orderStatus === "Delivered"){
        return(next(new ErrorHandler("You have already delivered this order"),400))
    }

    order.orderItems.forEach(async(order)=>{
        await updateStocks(order.product,order.quantity);
    })

    order.orderStatus = req.body.status;

    if(req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave:false});

    res.status(200).json({
        sucess:"true",
    })
})

// delete order for admin
exports.deleteOrder = catchAsyncError(async (req, res,next) => {

    const order = await Order.findById(req.params.id);

    if(!order){
        return next(new ErrorHandler("Order not found",400));
    }

    await order.remove();

    res.status(200).json({
        sucess:"true",
    })
})

async function updateStocks(id,quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;
    
    await product.save({validateBeforeSave:false});
}