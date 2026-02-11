import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'

const Orders = () => {
    const { orders, currency, navigate, token, getUserOrders } = useContext(ShopContext);
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        if (token && orders.length === 0) {
            getUserOrders(token)
        }
    }, [token])

    useEffect(() => {
        if (orders.length > 0) {
            setOrderList(orders);
        }
    }, [orders]);

    return (
        <div className='border-t pt-16'>
            <div className='text-2xl mb-8'>
                <h1>Your <span className='text-emerald-600 '> Orders </span></h1>
            </div>

            {orderList.length === 0 ? (
                <div className='text-center py-10'>
                    <p className='text-gray-500 text-lg mb-4'>No orders yet</p>
                    
                </div>
            ) : (
                <div className='space-y-6'>
                    {orderList.map((order, index) => (
                        <div key={order._id} className='border border-gray-300 rounded-lg p-6'>
                            <div className='flex justify-between items-start mb-4'>
                                <div>
                                    <p className='font-bold text-lg'>Order #{index + 1}</p>
                                    <p className='text-gray-500 text-sm'>Date: {new Date(order.date).toLocaleDateString()}</p>
                                    <p className='text-sm mt-1'><span className='font-semibold'>Status:</span> {order.status}</p>
                                    <p className='text-sm'><span className='font-semibold'>Payment:</span> {order.paymentMethod}</p>
                                </div>
                                <p className='font-bold text-lg'>{currency}{order.amount}</p>
                            </div>

                            <div className='border-t pt-4 mb-4'>
                                <h3 className='font-semibold mb-3'>Items:</h3>
                                {order.items && order.items.length > 0 ? (
                                    order.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className='flex items-center gap-4 py-2 border-b last:border-b-0'>
                                            <img className='w-16 h-20 object-cover' src={item.image && item.image[0] ? item.image[0] : ''} alt={item.title} />
                                            <div className='flex-1'>
                                                <p className='font-medium'>{item.title}</p>
                                                <p className='text-gray-500'>By {item.author}</p>
                                                <p className='text-sm mt-1'>Quantity: {item.quantity}</p>
                                            </div>
                                            <div className='text-right'>
                                                <p className='font-semibold'>{currency}{item.price}</p>
                                                <p className='text-gray-500 text-sm'>Total: {currency}{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className='text-gray-500'>No items in this order</p>
                                )}
                            </div>

                            <div className='border-t pt-4 space-y-2'>
                                <div className='flex justify-between font-bold text-lg'>
                                    <p>Total Amount:</p>
                                    <p>{currency}{order.amount}</p>
                                </div>
                            </div>

                            <div className='mt-4 pt-4 border-t'>
                                <p className='text-sm text-gray-600 mb-2'><span className='font-semibold'>Shipping Address:</span></p>
                                {order.address ? (
                                    <>
                                        <p className='text-sm'>{order.address.firstName} {order.address.lastName}</p>
                                        <p className='text-sm'>{order.address.street}</p>
                                        <p className='text-sm'>{order.address.city}, {order.address.state} {order.address.zipcode}</p>
                                        <p className='text-sm'>{order.address.country}</p>
                                        <p className='text-sm mt-2'><span className='font-semibold'>Email:</span> {order.address.email}</p>
                                        <p className='text-sm'><span className='font-semibold'>Phone:</span> {order.address.phone}</p>
                                    </>
                                ) : (
                                    <p className='text-gray-500'>Address not available</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className='flex justify-center my-8'>
                <button onClick={() => navigate('/collection')} className='bg-emerald-600 hover:bg-stone-900 text-white px-8 py-3'>CONTINUE SHOPPING</button>
            </div>
        </div>
    )
}

export default Orders
