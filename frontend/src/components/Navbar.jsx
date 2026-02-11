import React from 'react'
import { Link } from 'react-router-dom'
import search_icon from '../assets/search_icon.png'
import profile_icon from '../assets/profile_icon.png'
import cart_icon from '../assets/cart_icon.png'
import menu_icon from '../assets/menu_icon.png'
import dropdown_icon from '../assets/dropdown_icon.png'
import logo from '../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useEffect } from 'react'
import { useState, useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import CartSidebar from './CartSidebar'


export default function Navbar() {
    const [visible, setVisble] = useState(false);
    // New state to handle the dropdown toggle on mobile
    const [showDropdown, setShowDropdown] = useState(false);
    
    const { cartItems, getCartCount, navigate, token, logout, setIsCartOpen, setShowSearch } = useContext(ShopContext);

    useEffect(() => {
        if (visible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [visible]);

    return (
        <div className='flex items-center justify-between py-5 font-medium relative z-[100] bg-white px-4 md:px-10'>
            
            <Link to='/'><img src={logo} alt="Logo" className='w-32' /></Link>

            <div className='hidden sm:flex gap-6 text-gray-700'>
                <NavLink to="/" className="hover:text-emerald-600">HOME</NavLink>
                <NavLink to="/collection" className="hover:text-emerald-600" >COLLECTION</NavLink>
                <NavLink to="/about" className="hover:text-emerald-600">ABOUT</NavLink>
                <NavLink to="/contact" className="hover:text-emerald-600">CONTACT</NavLink>
            </div>

            <div className='flex items-center gap-6'>
                <img 
                    onClick={() => { setShowSearch(true); navigate('/collection'); }} 
                    src={search_icon} 
                    className="w-5 cursor-pointer" 
                    alt="Search" 
                />
                
                {/* --- PROFILE ICON SECTION --- */}
                <div className='relative'>
                    <img 
                        onClick={() => {
                            if (!token) {
                                navigate('/login');
                            } else {
                                // Toggle dropdown on click for mobile
                                setShowDropdown(!showDropdown);
                            }
                        }} 
                        src={profile_icon} 
                        className="w-5 cursor-pointer" 
                        alt="Profile" 
                    />
                    
                    {/* Logic: 
                        1. Show if token exists AND
                        2. (Either hovered via group-hover on desktop OR showDropdown is true on mobile)
                    */}
                    {token && (
                        <div className={`${showDropdown ? 'block' : 'hidden'} group-hover:block absolute dropdown-menu right-0 pt-4 z-[110]`}>
                            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-xl border border-gray-200'>
                                
                                <p onClick={() => { navigate('/orders'); setShowDropdown(false); }} className='cursor-pointer hover:text-black'>Orders</p>
                                <p onClick={() => { logout(); setShowDropdown(false); navigate('/login'); }} className='cursor-pointer hover:text-black border-t pt-1'>Logout</p>
                            </div>
                        </div>
                    )}
                </div>

                <div onClick={() => setIsCartOpen(true)} className='relative cursor-pointer'>
                    <img src={cart_icon} className="w-5" alt="" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-emerald-600 text-white aspect-square rounded-full text-[8px]'>
                        {getCartCount()}
                    </p>
                </div>

                <img onClick={() => setVisble(true)} src={menu_icon} className="w-5 cursor-pointer sm:hidden" alt=""/>
            </div>

            {/* Side Menu Drawer */}
            <div className={`fixed inset-0 bg-white transition-all duration-300 z-[200] ${visible ? 'translate-x-0' : 'translate-x-full'}`}>
                {/* ... (Your existing mobile sidebar code) ... */}
                 <div className='flex flex-col text-gray-600'>
                    <div onClick={()=>setVisble(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                        <img className='h-4 rotate-180' src={dropdown_icon} alt="" />
                        <p>Back</p>
                    </div>
                    <NavLink onClick={()=>setVisble(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
                    <NavLink onClick={()=>setVisble(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
                    <NavLink onClick={()=>setVisble(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
                    <NavLink onClick={()=>setVisble(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
                </div>
            </div>

            {/* Cart Sidebar */}
            <CartSidebar />
        </div>
    )
}
