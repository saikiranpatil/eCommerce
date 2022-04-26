const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the product name"]
    },
    description: {
        type: String,
        required: [true, "please enter the product name"]
    },
    price: {
        type: Number,
        required: [true, "please enter the price"],
        maxLength: [8, "price cannot exceed 8 digits"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, "please enter the product category"]
    },
    stock: {
        type: String,
        required: [true, "please enter the product category"],
        maxlength: [4, "stock cannot exeed 4 digits"],
        default: 1
    },
    noOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true
            },
            avatar: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            },
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("Product", productSchema)