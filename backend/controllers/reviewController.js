import Review from '../models/reviewModel.js';
import bookModel from '../models/bookModel.js';

// Add a new review
const addReview = async (req, res) => {
    try {
        const { bookId, rating, review } = req.body;
        const userId = req.userId;
        const userName = req.userName;

        // Check if user already reviewed this book
        const existingReview = await Review.findOne({ bookId, userId });
        if (existingReview) {
            return res.json({ success: false, message: "You have already reviewed this book" });
        }

        const newReview = new Review({
            bookId,
            userId,
            userName,
            rating,
            review
        });

        await newReview.save();

        // Update book's average rating
        await updateBookRating(bookId);

        res.json({ success: true, message: "Review added successfully", review: newReview });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Get reviews for a book
const getBookReviews = async (req, res) => {
    try {
        const { bookId } = req.body;
        const reviews = await Review.find({ bookId }).sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Update book's average rating
const updateBookRating = async (bookId) => {
    try {
        const reviews = await Review.find({ bookId });
        if (reviews.length > 0) {
            const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
            await bookModel.findByIdAndUpdate(bookId, { rating: avgRating.toFixed(1) });
        }
    } catch (error) {
        console.log("Error updating book rating:", error);
    }
};

export { addReview, getBookReviews };