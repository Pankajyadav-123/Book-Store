import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import BookItem from '../components/book.jsx'
import dropdown_icon from '../assets/dropdown_icon.png'

const Collection = () => {
    const { Books: books, search } = useContext(ShopContext);

    const [language, setLanguage] = useState([]);
    const [category, setCategory] = useState([]);
    const [filterBooks, setFilterBooks] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [sortType, setSortType] = useState('relavent')

    const toggleLanguage = (e) => {

        if (language.includes(e.target.value)) {
            setLanguage(prev => prev.filter(a => a !== e.target.value))
        } else {
            setLanguage(prev => [...prev, e.target.value])
        }
    }

    const toggleCategory = (e) => {

        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(a => a !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {
        if (!books) return setFilterBooks([]);

        let productsCopy = books.slice();

        if (language.length > 0) {
            productsCopy = productsCopy.filter(item => language.includes(item.language));
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }

        if (search) {
            const searchTerm = search.toLowerCase();
            productsCopy = productsCopy.filter(item => {
                const bookName = (item.name || item.title || '').toLowerCase();
                const authorName = (item.author || '').toLowerCase();
                return bookName.includes(searchTerm) || authorName.includes(searchTerm);
            });
        }

        setFilterBooks(productsCopy);
    }


    useEffect(() => {
        applyFilter();
    }, [books, language, category, search]);

    const displayedBooks = useMemo(() => {
        const fp = Array.isArray(filterBooks) ? [...filterBooks] : [];
        switch (sortType) {
            case 'low-high':
                return fp.sort((a, b) => (a.price - b.price));
            case 'high-low':
                return fp.sort((a, b) => (b.price - a.price));
            default:
                return fp;
        }
    }, [filterBooks, sortType]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min w-60'>
                 <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS<img className={`h-3 sm:hidden ${showFilter ? ' rotate-90' : ''}`} src={dropdown_icon} alt="" /></p>
                
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>Language</p>
                    <div>
                        <p className='flex gap-2'><input className='w-3' value={"English"} onChange={toggleLanguage} type="checkbox" />English</p>
                        <p className='flex gap-2'><input className='w-3' value={"Hindi"} onChange={toggleLanguage} type="checkbox" />Hindi</p>
                    </div>
                </div>

                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'><input className='w-3' value={"Novel"} onChange={toggleCategory} type="checkbox" /> Novel </p>
                        <p className='flex gap-2'><input className='w-3' value={"Story"} onChange={toggleCategory} type="checkbox" />Story</p>
                        <p className='flex gap-2'><input className='w-3' value={"Biography"} onChange={toggleCategory} type="checkbox" />Biography</p>
                        <p className='flex gap-2'><input className='w-3' value={"Poetry"} onChange={toggleCategory} type="checkbox" />Poetry</p>
                    </div>

                </div>
            </div>


            <div className='flex-1'>

                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <p className=''>All <span className='text-emerald-600'>Collections </span></p>

                    {/* Product Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2' name="" id="">
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                {displayedBooks.length > 0 ? (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                        {
                            displayedBooks.map((item, index) => (
                                <BookItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} author={item.author} />
                            ))
                        }
                    </div>
                ) : (
                    <div className='text-center py-20'>
                        <p className='text-gray-500 text-lg'>No books found</p>
                        {search && <p className='text-gray-400 text-sm mt-2'>Try searching with a different name</p>}
                    </div>
                )}
            </div>



        </div>
    )
}

export default Collection