import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js"
import cors from "cors"
import userRouter from "./routes/userRoute.js";
import bookRouter from "./routes/bookRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

dotenv.config();

//app config
const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
connectCloudinary();

//middelwares
app.use(express.json());
app.use(cors());


//api

app.use("/api/user", userRouter);
app.use("/api/book",bookRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.get("/", (req, res) => {
    res.send("Welcome to the Book Shop API");
});