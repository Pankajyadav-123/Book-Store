import express from "express";
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import { addReview, getBookReviews } from '../controllers/reviewController.js';

const reviewRouter = express.Router();

// Middleware to authenticate and get user info
const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' })
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(token_decode.id);
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        req.userId = token_decode.id;
        req.userName = user.name;
        next();
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get reviews for a book (public)
reviewRouter.post('/get', getBookReviews);

// Add a review (authenticated)
reviewRouter.post('/add', authUser, addReview);

export default reviewRouter;