import React, { useContext, useEffect, useState } from 'react'

import { ShopContext } from '../context/ShopContext';
import Book from "./book";

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([])
    const { Books } = useContext(ShopContext)

    useEffect(() => {

        const bestProduct = Books.filter((item) => (item.bestseller))
        setBestSeller(bestProduct.slice(0, 5))

    }, [Books])

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <p>Best <span className='text-emerald-600'> Seller </span></p>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.</p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    bestSeller.map((item, index) => (
                        <Book key={index} id={item._id} image={item.image} name={item.title} author={item.author} price={item.price} />
                    ))
                }
            </div>
        </div>
    )
}

export default BestSeller
