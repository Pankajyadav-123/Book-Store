import React from 'react'
import { useContext, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import {toast} from 'react-toastify'
import axios from 'axios'

const Verify = () => {

    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)
    const [searchParams, setSearchParams] = useSearchParams()
    const verifiedRef = useRef(false)
    
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async () => {
        console.log('verifyPayment called, token:', token ? 'present' : 'missing', 'success:', success, 'orderId:', orderId)
        
        try {
            if (!token) {
                console.log('No token, waiting...')
                return null
            }
            
            if (verifiedRef.current) {
                console.log('Already verified, skipping')
                return null
            }
            
            verifiedRef.current = true
            console.log('Calling verifyStripe API...')

            const response = await axios.post(backendUrl + '/api/order/verifyStripe', { success, orderId }, { headers: { token } })
            console.log('verifyStripe response:', response.data)

            if (response.data.success) {
                console.log('Payment verified, clearing cart...')
                // Fetch fresh cart from backend to ensure sync (should be empty)
                const cartRes = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
                console.log('Cart data from backend:', cartRes.data)
                setCartItems(cartRes.data?.cartData || {})
                console.log('Navigating to /orders')
                navigate('/orders')
            } else {
                console.log('Payment verification failed, going to cart')
                navigate('/cart')
            }

        } catch (error) {
            console.log('verifyPayment error:', error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        verifyPayment()
    }, [token])

    return (
        <div>

        </div>
    )
}

export default Verify