import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const BookItem = ({ id, image, name, author, price }) => {
    const { currency } = useContext(ShopContext);
    return (
         <Link to={`/book/${id}`} onClick={() => window.scrollTo(0, 0)} className='text-gray-700 cursor-pointer border rounded-lg hover:shadow-lg transition-shadow duration-300 p-3'>

            <div className='overflow-hidden rounded w-full aspect-square mb-3'>
                <img className='hover:scale-110 transition ease-in-out w-full h-full object-contain' src={image} alt="" />
            </div>
            
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm text-gray-500'>{author}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
           
        </Link>
    )
}
export default BookItem;
