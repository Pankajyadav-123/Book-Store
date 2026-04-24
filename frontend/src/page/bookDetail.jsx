import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import RelatedBook from '../components/RealatedBook'

const BookDetail = () => {
    const { bookId } = useParams();
    const { Books, currency, addToCart, getReviews, addReview, token } = useContext(ShopContext);
    const [bookData, setBookData] = useState(null);
    const [image, setImage] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [activeTab, setActiveTab] = useState('description');

    const fetchProductData = () => {
        if (!Books || Books.length === 0) return;
        const found = Books.find(item => item._id === bookId || item.id === bookId);
        if (found) {
            setBookData(found);
            const img = Array.isArray(found.image) ? found.image[0] : found.image;
            setImage(img || null);
        }
    }

    const loadReviews = async () => {
        const reviewsData = await getReviews(bookId);
        setReviews(reviewsData);
    }

    useEffect(() => {
        fetchProductData();
        loadReviews();
    }, [bookId, Books]);

    const handleSubmitReview = async () => {
        if (userRating === 0) { alert('Please select a rating'); return; }
        if (!reviewText.trim()) { alert('Please write a review'); return; }
        const success = await addReview(bookId, userRating, reviewText);
        if (success) {
            setUserRating(0);
            setReviewText('');
            setShowReviewForm(false);
            loadReviews();
        }
    }

    const images = bookData ? (Array.isArray(bookData.image) ? bookData.image : (bookData.image ? [bookData.image] : [])) : [];

    const renderStars = (rating, interactive = false, onRate = null) => {
        return (
            <div className='flex gap-0.5'>
                {[1, 2, 3, 4, 5].map((star) => (
                    <img
                        key={star}
                        className={`${interactive ? 'w-5 h-5 cursor-pointer transition-transform hover:scale-110' : 'w-4 h-4'}`}
                        src={star <= (interactive ? (hoverRating || userRating) : rating) ? star_icon : star_dull_icon}
                        alt=""
                        onClick={() => interactive && onRate && onRate(star)}
                        onMouseEnter={() => interactive && setHoverRating(star)}
                        onMouseLeave={() => interactive && setHoverRating(0)}
                    />
                ))}
            </div>
        );
    };

    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;
    const totalReviews = reviews.length;

    if (!bookData) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div className='animate-spin w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full'></div>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
            {/* Breadcrumb */}
            <nav className='text-sm text-gray-500 mb-6'>
                <span>Home</span> / <span>Books</span> / <span className='text-emerald-600'>{bookData?.title}</span>
            </nav>

            {/* Main Product Section */}
            <div className='bg-white border border-gray-200 overflow-hidden'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10'>
                    {/* Image Gallery */}
                    <div className='space-y-4'>
                        {/* Main Image */}
                        <div className='relative overflow-hidden rounded-xl bg-gray-100 aspect-[3/4] group max-w-md mx-auto'>
                            {image ? (
                                <img
                                    src={image}
                                    alt={bookData?.title}
                                    className='w-full h-full object-contain transition-transform duration-500 group-hover:scale-105'
                                />
                            ) : (
                                <div className='w-full h-full flex items-center justify-center text-gray-400'>
                                    No Image Available
                                </div>
                            )}
                            {bookData?.bestseller && (
                                <span className='absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full'>
                                    BESTSELLER
                                </span>
                            )}
                        </div>

                        {/* Thumbnail Strip */}
                        <div className='flex gap-2 overflow-x-auto pb-2 justify-center'>
                            {images.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setImage(item)}
                                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                        image === item ? 'border-emerald-600' : 'border-gray-200 hover:border-emerald-400'
                                    }`}
                                >
                                    <img className='w-full h-full object-cover' src={item} alt="" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className='flex flex-col justify-center space-y-6'>
                        {/* Category Badge */}
                        <span className='inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold w-fit'>
                            {bookData?.category}
                        </span>

                        {/* Title */}
                        <h1 className='text-4xl lg:text-5xl font-bold text-gray-900 leading-tight'>
                            {bookData?.title}
                        </h1>

                        {/* Author */}
                        <p className='text-xl text-gray-600'>
                            by <span className='text-emerald-600 font-semibold'>{bookData?.author}</span>
                        </p>

                        {/* Rating */}
                        <div className='flex items-center gap-3'>
                            <div className='flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl'>
                                <span className='text-2xl font-bold text-amber-600'>{averageRating}</span>
                                {renderStars(Math.round(averageRating))}
                            </div>
                            <span className='text-gray-500'>({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})</span>
                        </div>

                        {/* Price */}
                        <div className='flex items-baseline gap-3'>
                            <span className='text-4xl font-bold text-gray-900'>{currency}{bookData?.price}</span>
                            {bookData?.originalPrice && (
                                <>
                                    <span className='text-xl text-gray-400 line-through'>{currency}{bookData?.originalPrice}</span>
                                    <span className='text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg'>
                                        {Math.round((1 - bookData.price / bookData.originalPrice) * 100)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <p className='text-gray-600 leading-relaxed text-lg'>
                            {bookData?.description}
                        </p>

                        {/* Language Badge */}
                        <div className='flex items-center gap-2 text-sm text-gray-500'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                            </svg>
                            Language: <span className='font-medium text-gray-700'>{bookData?.language}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className='pt-4'>
                            <button
                                onClick={() => addToCart(bookData._id)}
                                className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 transition-colors'
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Features */}
                        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t'>
                            <div className='flex items-center gap-3 text-sm'>
                                <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className='text-gray-700'>100% Original</span>
                            </div>
                            <div className='flex items-center gap-3 text-sm'>
                                <div className='w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center'>
                                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <span className='text-gray-700'>Cash on Delivery</span>
                            </div>
                            <div className='flex items-center gap-3 text-sm'>
                                <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
                                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </div>
                                <span className='text-gray-700'>7 Day Returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className='mt-8'>
                <div className='flex gap-1 bg-gray-100 p-1'>
                    <button
                        onClick={() => setActiveTab('description')}
                        className={`px-6 py-2.5 font-medium transition-all ${
                            activeTab === 'description' ? 'bg-white text-emerald-600' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setActiveTab('reviews')}
                        className={`px-6 py-2.5 font-medium transition-all ${
                            activeTab === 'reviews' ? 'bg-white text-emerald-600' : 'text-gray-600 hover:text-gray-900'
                        }`}
                    >
                        Reviews ({totalReviews})
                    </button>
                </div>

                <div className='bg-white border border-gray-200 p-6 lg:p-8 mt-0'>
                    {activeTab === 'description' && (
                        <div>
                            <h3 className='text-lg font-bold text-gray-900 mb-4'>About this book</h3>
                            <p className='text-gray-600 leading-relaxed'>{bookData?.description}</p>
                            <div className='mt-6 grid grid-cols-2 gap-4'>
                                <div className='bg-gray-50 p-4'>
                                    <span className='text-gray-500 text-sm'>Author</span>
                                    <p className='font-semibold text-gray-900'>{bookData?.author}</p>
                                </div>
                                <div className='bg-gray-50 p-4'>
                                    <span className='text-gray-500 text-sm'>Language</span>
                                    <p className='font-semibold text-gray-900'>{bookData?.language}</p>
                                </div>
                                <div className='bg-gray-50 p-4'>
                                    <span className='text-gray-500 text-sm'>Category</span>
                                    <p className='font-semibold text-gray-900'>{bookData?.category}</p>
                                </div>
                                <div className='bg-gray-50 p-4'>
                                    <span className='text-gray-500 text-sm'>Rating</span>
                                    <div className='flex items-center gap-2'>
                                        <span className='font-semibold text-gray-900'>{averageRating}</span>
                                        <div className='flex'>{renderStars(Math.round(averageRating))}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reviews' && (
                        <div className='space-y-5'>
                            {/* Write Review Section */}
                            <div className='bg-gray-50 p-5'>
                                <h3 className='text-base font-bold text-gray-900 mb-4'>Share your thoughts</h3>
                                {token ? (
                                    showReviewForm ? (
                                        <div className='space-y-4'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-2'>Your Rating</label>
                                                <div className='flex gap-1'>{renderStars(userRating, true, setUserRating)}</div>
                                            </div>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-2'>Your Review</label>
                                                <textarea
                                                    className='w-full border border-gray-300 p-3 h-28 resize-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent'
                                                    placeholder='Write your review here...'
                                                    value={reviewText}
                                                    onChange={(e) => setReviewText(e.target.value)}
                                                />
                                            </div>
                                            <div className='flex gap-3'>
                                                <button
                                                    onClick={handleSubmitReview}
                                                    className='bg-emerald-600 text-white font-semibold px-6 py-2 hover:bg-emerald-700 transition-colors'
                                                >
                                                    Submit Review
                                                </button>
                                                <button
                                                    onClick={() => { setShowReviewForm(false); setUserRating(0); setReviewText(''); }}
                                                    className='border border-gray-300 px-6 py-2 hover:bg-gray-100 transition-colors'
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => setShowReviewForm(true)}
                                            className='bg-emerald-600 text-white font-semibold px-6 py-2 hover:bg-emerald-700 transition-colors'
                                        >
                                            Write a Review
                                        </button>
                                    )
                                ) : (
                                    <p className='text-gray-600'>
                                        Please <a href='/login' className='text-emerald-600 font-semibold hover:underline'>login</a> to write a review.
                                    </p>
                                )}
                            </div>

                            {/* Reviews List */}
                            <div>
                                <h3 className='text-base font-bold text-gray-900 mb-4'>Customer Reviews</h3>
                                {reviews.length > 0 ? (
                                    <div className='space-y-4'>
                                        {reviews.map((review, index) => (
                                            <div key={index} className='border-b border-gray-100 pb-4'>
                                                <div className='flex items-start gap-3 mb-2'>
                                                    <div className='w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold text-sm'>
                                                        {review.userName?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className='flex-1'>
                                                        <div className='flex items-center gap-2'>
                                                            <p className='font-semibold text-gray-900'>{review.userName}</p>
                                                            <div className='flex gap-0.5'>{renderStars(review.rating)}</div>
                                                            <span className='text-xs text-gray-400'>
                                                                {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                                            </span>
                                                        </div>
                                                        <p className='text-gray-600 text-sm mt-1'>{review.review}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className='text-center py-10 bg-gray-50'>
                                        <p className='text-gray-500 font-medium'>No reviews yet</p>
                                        <p className='text-gray-400 text-sm'>Be the first to review this book!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Related Books */}
            <div className='mt-16'>
                <RelatedBook language={bookData?.language} category={bookData?.category} />
            </div>
        </div>
    )
}

export default BookDetail