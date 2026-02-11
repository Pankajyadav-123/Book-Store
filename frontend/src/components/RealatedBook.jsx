import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import BookItem from './book.jsx'

const RelatedBook = ({ language, category }) => {
    const { Books } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (!Books || Books.length === 0) {
            setRelated([]);
            return;
        }

        let productsCopy = Books.slice();
        if (language) {
            productsCopy = productsCopy.filter(item => (item.language || item.lanuage) === language);
        }
        if (category) {
            productsCopy = productsCopy.filter(item => item.category === category);
        }
        setRelated(productsCopy.slice(0, 5));
    }, [Books, language, category])

    return (
         <div className='my-24'>
            <div className='text-center text-3xl py-2'>
               <p>Related <spna className="text-emerald-600">Books</spna></p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {
                    related.map((item, index) => {
                        const id = item._id || item.id;
                        const name = item.name || item.title;
                        const image = Array.isArray(item.image) ? item.image[0] : item.image;
                        const author = item.author || '';
                        const price = item.price || item.price === 0 ? item.price : '';
                        return <BookItem key={index} id={id} image={image} name={name} author={author} price={price} />
                    })
                }
            </div>
        </div>

    )
}

export default RelatedBook