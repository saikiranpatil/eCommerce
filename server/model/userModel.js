const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const jwtToken = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter your name"],
        maxLength: [30, "Name cannot be greater than 31 Characters"],
        minLength: [3, "Name cannot be less than 3 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter a valid Email"],
        unique: [true, "user Already Exists"],
        validate: [validator.isEmail, "Please Enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Enter Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false
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
    createdAt:{
        type: Date,
        default: Date.now()
    },
    role: {
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPassswordExpiry: Date

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcryptjs.hash(this.password, 10);

})

// jwt Web TOken 
userSchema.methods.getJWTToken = function () {
    return jwtToken.sign(
        { id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
    )
}

// compare password 
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs.compare(enteredPassword, this.password);
}


// generating token for reset password
userSchema.methods.getResetPasswordToken = async function () {
    // generating token 
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    // hashing and adding resetpassword token to userschema 
    this.resetPasswordToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex");

    this.resetPasswordExpiry = Date.now() + 15 * 60 * 1000;

    return resetPasswordToken;
}

module.exports = mongoose.model("User", userSchema);