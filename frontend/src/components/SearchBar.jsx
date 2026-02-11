import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const location = useLocation();

    useEffect(() => {
        // Only show search bar on collection page
        if (location.pathname !== '/collection') {
            setShowSearch(false);
        }
    }, [location]);

    if (!showSearch || location.pathname !== '/collection') return null;

    return (
        <div className='border-t border-b bg-gray-50 text-center py-4'>
            <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full w-3/4 sm:w-1/2'>
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className='flex-1 outline-none bg-inherit text-sm' 
                    type="text" 
                    placeholder='Search books...'
                    autoFocus
                />
                {search && (
                    <span 
                        onClick={() => setSearch('')} 
                        className='cursor-pointer text-gray-500 hover:text-gray-700 ml-2'
                    >
                        ✕
                    </span>
                )}
            </div>
            <span 
                onClick={() => setShowSearch(false)} 
                className='inline-flex items-center justify-center w-8 h-8 cursor-pointer text-gray-500 hover:text-gray-700'
            >
                ✕
            </span>
        </div>
    )
}

export default SearchBar
