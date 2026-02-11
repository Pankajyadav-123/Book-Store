import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import bin_icon from '../assets/bin_icon.png'

const CartSidebar = () => {
    const { 
        Books, 
        currency, 
        cartItems, 
        updateQuantity, 
        navigate, 
        getCartCount, 
        getCartAmount,
        isCartOpen,
        setIsCartOpen 
    } = useContext(ShopContext);
    
    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        const tempData = []
        for (const items in cartItems) {
            if (cartItems[items] > 0) {
                tempData.push({
                    _id: items,
                    quantity: cartItems[items]
                })
            }
        }
        setCartData(tempData)
    }, [cartItems])

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isCartOpen]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/place-order');
    }

    const handleViewCart = () => {
        setIsCartOpen(false);
        navigate('/cart');
    }

    return (
        <>
            {/* Overlay */}
            <div 
                className={`fixed inset-0 bg-black transition-opacity duration-300 z-[150] ${isCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsCartOpen(false)}
            />
            
            {/* Sidebar */}
            <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white shadow-xl z-[200] transform transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className='flex items-center justify-between p-4 border-b'>
                        <h2 className='text-xl font-semibold'>Your Cart ({getCartCount()})</h2>
                        <button 
                            onClick={() => setIsCartOpen(false)}
                            className='text-2xl hover:text-gray-600'
                        >
                            ×
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className='flex-1 overflow-y-auto p-4'>
                        {cartData.length === 0 ? (
                            <div className='flex flex-col items-center justify-center h-full text-gray-500'>
                                <p className='text-lg'>Your cart is empty</p>
                                <button 
                                    onClick={() => { setIsCartOpen(false); navigate('/collection'); }}
                                    className='mt-4 text-emerald-600 hover:underline'
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            cartData.map((item, index) => {
                                const bookData = Books.find((book) => book._id === item._id);
                                if (!bookData) return null;
                                
                                return (
                                    <div key={index} className='flex gap-4 py-4 border-b'>
                                        <img 
                                            className='w-20 h-24 object-contain' 
                                            src={Array.isArray(bookData.image) ? bookData.image[0] : bookData.image} 
                                            alt={bookData.title} 
                                        />
                                        <div className='flex-1'>
                                            <p className='font-medium text-sm'>{bookData.title}</p>
                                            <p className='text-gray-500 text-sm'>{bookData.author}</p>
                                            <p className='font-medium mt-1'>{currency}{bookData.price}</p>
                                            <div className='flex items-center gap-2 mt-2'>
                                                <button 
                                                    onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                                    className='w-6 h-6 border rounded hover:bg-gray-100'
                                                >
                                                    -
                                                </button>
                                                <span className='w-8 text-center'>{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    className='w-6 h-6 border rounded hover:bg-gray-100'
                                                >
                                                    +
                                                </button>
                                                <img 
                                                    onClick={() => updateQuantity(item._id, 0)} 
                                                    className='w-4 ml-auto cursor-pointer hover:opacity-70' 
                                                    src={bin_icon} 
                                                    alt="Remove" 
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Footer */}
                    {cartData.length > 0 && (
                        <div className='border-t p-4'>
                            <div className='flex justify-between mb-4'>
                                <span className='font-medium'>Subtotal:</span>
                                <span className='font-semibold'>{currency}{getCartAmount()}</span>
                            </div>
                            <button 
                                onClick={handleViewCart}
                                className='w-full mb-2 py-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition-colors'
                            >
                                VIEW CART
                            </button>
                            <button 
                                onClick={handleCheckout}
                                className='w-full py-3 bg-emerald-600 text-white hover:bg-stone-900 transition-colors'
                            >
                                CHECKOUT
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartSidebar
