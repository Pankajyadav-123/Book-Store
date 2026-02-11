import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import RelatedBook from '../components/RealatedBook'

const BookDetail = () => {
    const { bookId } = useParams();
    const { Books, currency,addToCart } = useContext(ShopContext);
    const [bookData, setBookData] = useState(null);
    const [image, setImage] = useState(null);

    const fetchProductData = () => {
        if (!Books || Books.length === 0) {
            setBookData(null);
            setImage("");
            return;
        }

        const found = Books.find(item => item._id === bookId || item.id === bookId);
        if (found) {
            setBookData(found);
            const img = Array.isArray(found.image) ? found.image[0] : found.image;
            setImage(img || null);
        } else {
            setBookData(null);
            setImage(null);
        }
    }

    useEffect(() => {
        fetchProductData();
    }, [bookId, Books]);

    const images = bookData ? (Array.isArray(bookData.image) ? bookData.image : (bookData.image ? [bookData.image] : [])) : [];


    return (
        <div>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>  {/* -------- Product Row ---------- */}

                {/* -------- Product Images ---------- */}

                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {images.map((item, index) => (
                            item ? <img key={index} onClick={() => setImage(item)} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' src={item} alt="" /> : null
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        {image ? <img className='w-full h-auto' src={image} alt="" /> : null}
                    </div>
                </div>

                {/* -------- Product Info ---------- */}

                <div className='flex-1'>

                    <h1 className='font-medium text-5xl mt-2'>{bookData?.name || bookData?.title}</h1>
                    <div className='flex items-center gap-1 mt-2'>
                        <img className='w-3.5' src={star_icon} alt="" />
                        <img className='w-3.5' src={star_icon} alt="" />
                        <img className='w-3.5' src={star_icon} alt="" />
                        <img className='w-3.5' src={star_icon} alt="" />
                        <img className='w-3.5' src={star_dull_icon} alt="" />
                        <p className='pl-2'>(122)</p>
                    </div>
                        <p className='mt-5 text-2xl font-medium'>{bookData?.author}</p>
                    <p className='mt-5 text-3xl font-medium'>{currency}{bookData?.price}</p>
                    <p className='mt-5 text-gray-500 md:w-4/5'>{bookData?.description}</p>

                    <button onClick={()=>addToCart(bookData._id)} className='bg-emerald-600 hover:bg-stone-900 text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>

                    <hr className='mt-8 sm:w-4/5' />

                    <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>
            <div className='mt-20'>
                <div className='flex'>
                    <b className='border px-5 py-3 text-sm'>Description</b>
                    <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                </div>
                <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>
                    <p>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.</p>
                </div>
            </div>
                 <RelatedBook language={bookData?.language} category={bookData?.category} />
        </div>

    )
}

export default BookDetail