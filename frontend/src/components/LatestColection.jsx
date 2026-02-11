import React, { useState, useContext, useEffect } from 'react'
import BookItem from './book.jsx'
import { ShopContext } from '../context/ShopContext'

const LatestColection = () => {
    const [latestBooks, setLatestBooks] = useState([]);
    const { Books } = useContext(ShopContext);
    
    useEffect(() => {
        if (Books && Books.length > 0) {
            setLatestBooks(Books.slice(0, 10))
        }
    }, [Books])
    return (
        <div className='my-10'>
            <div className='text-center py-8'>
                <h2 className='text-3xl font-bold'>LATEST <span className='text-emerald-600'>BOOKS</span></h2>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
            </div>
            {/* Rendering Books */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {latestBooks.map((item, index) => {
                    const id = item._id || item.id;
                    const name = item.name || item.title;
                    const image = Array.isArray(item.image) ? item.image[0] : item.image;
                    const author = item.author || '';
                    const price = item.price || item.price === 0 ? item.price : '';
                    return <BookItem key={index} id={id} image={image} name={name} author={author} price={price} />
                })}
            </div>
        </div>
    )
}
export default LatestColection;