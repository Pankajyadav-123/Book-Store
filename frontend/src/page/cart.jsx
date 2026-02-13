import React from 'react'
import { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import bin_icon from '../assets/bin_icon.png'
import CartTotal from '../components/cartTotal'

const cart = () => {
  const { Books, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const isInitialized = useRef(false);

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
    
    // Only redirect after cart has been initialized and is empty
    if (isInitialized.current && tempData.length === 0) {
      navigate('/')
    }
    isInitialized.current = true
  }, [cartItems, navigate])


    return (

        <div>
            <div className='text-2xl mb-3'>
        <p>Your Cart</p>
      </div>

      <div>
        {cartData.map((item, index) => {

          const bookData = Books.find((book) => book._id === item._id);

          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={bookData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{bookData.title}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{bookData.price}</p>
                   
                  </div>
                </div>
              </div>
              <input onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, Number(e.target.value))} className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} defaultValue={item.quantity} />
              <img onClick={() => updateQuantity(item._id, 0)} className='w-4 mr-4 sm:w-5 cursor-pointer' src={bin_icon} alt="" />
            </div>
          )

        })}
      </div>
      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/place-order')} className='bg-emerald-600 hover:bg-stone-900 text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>

      </div>
        </div>
    )
}
export default cart