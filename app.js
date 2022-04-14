const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary");

const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");

// import db 
const connectDB = require("./server/database/connections");

// using the middleware for error handling
const errorMiddleware = require("./server/middleware/error");

// handling uncaught exception 
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log('Shutting down the server due to uncaught exception error');
    process.exit(1);
})

// path for config 
dotenv.config({ path: "./config.env" });
const port = process.env.PORT;

// connecting to database 
connectDB();

// setting up cloudinary 
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}));
app.use(fileUpload());

// import routes 
const productRoute = require("./server/routes/productRoutes");
const userRoute = require("./server/routes/userRoutes");
const orderRoute = require("./server/routes/orderRoutes");
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);


// error handling 
app.use(errorMiddleware);

const server = app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
})


// unhandled promise rejection 
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("server Is shutting down down due to unhandled server Rejection");
    server.close(() => {
        process.exit(1);
    })
})