const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../model/productModel");
const ApiFeatures = require("../utils/apifeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");


// create product for ADMIN
exports.createProduct = catchAsyncError(async (req, res, next) => {

    var images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products"
        })
        imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    }

    req.body.images = imagesLinks
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        sucess: true,
        product
    })
});

// get all products 
exports.getAllProducts = catchAsyncError(async (req, res, next) => {

    const productsPerPage = 8;

    const productsCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .search()
        .filter()
        .pagination(productsPerPage);

    const products = await apiFeature.query;

    res.status(200).json({
        sucess: true,
        products,
        productsCount,
        productsPerPage,
    })
});

// update product--ADMIN 
exports.updateProduct = catchAsyncError(async (req, res, next) => {
    var product = await Product.findById(req.params.id);


    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    // images 
    var images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    if (images !== undefined) {
        // Deleting all Images 
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder: "products"
            })
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
        req.body.images = imagesLinks;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true.valueOf,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        sucess: true,
        product
    })
});

// delete product--ADMIN 
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404));

    }

    // Deleting all Images 
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(200).json({
        sucess: true,
        message: "product deleted sucessfully"
    })
});

// get all products 
exports.getProductDetails = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("product not found", 404));
    }

    res.status(200).json({
        sucess: true,
        product
    })
});

// get all products for ADMIN
exports.getAllProductsForAdmin = catchAsyncError(async (req, res, next) => {

    const products = await Product.find();

    res.status(200).json({
        sucess: true,
        products,
    })
});

// add or edit product review 
exports.addProductReview = catchAsyncError(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        avatar: req.user.avatar,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler(`Product not found with id ${productId}`), 400);
    }

    var reviewFound = false;

    let sum = 0;
    product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
            reviewFound = true;
            review.rating = rating,
                review.comment = comment
        }
        sum += review.rating;
    })

    if (!reviewFound) {
        product.reviews.push(review);
        sum += review.rating;
    }

    product.noOfReviews = product.reviews.length;

    product.ratings = Math.round((sum / product.reviews.length) * 10) / 10;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        sucess: true,
    });
})

// get all review of a product
exports.allReviewsOfProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found with given ID", 400));
    }

    res.status(200).json({
        sucess: true,
        reviews: product.reviews
    })
})

// delete review of a product
exports.deleteReviewsOfProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.body.productId);

    if (!product) {
        return next(new ErrorHandler("Product not found with given ID", 400));
    }

    const reviews = product.reviews.filter(review => review.user.toString() !== req.body.userId);

    let sum = 0;
    reviews.forEach(review => sum += review.rating);

    product.noofReviews = reviews.length;
    product.ratings = Math.round((sum / reviews.length) * 10) / 10;

    product.reviews = reviews;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        sucess: true,
    })
})