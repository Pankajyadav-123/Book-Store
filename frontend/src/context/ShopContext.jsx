import React, { use, useEffect } from 'react'
import { createContext, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from 'axios';



export const ShopContext = createContext();


const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_fee = 49;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // Initialize token from localStorage
    const [token ,setToken] = useState(localStorage.getItem('token') || '');
    const [isTokenLoaded, setIsTokenLoaded] = useState(true);
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]);
    const [Books,setBooks]=useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);



    const addToCart = async (itemId) => {
        // Check if user is authenticated
        if (!token) {
            toast.error('Please login to add items to cart');
            navigate('/login');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            cartData[itemId] += 1;
        }
        else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);

        try {
            await axios.post(backendUrl + '/api/cart/add', { itemId, }, { headers: { token } })
            toast.success('Added to cart');
            setIsCartOpen(true);
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    



    const updateQuantity = async (itemId, quantity) => {
        // Check if user is authenticated
        if (!token) {
            toast.error('Please login to update cart');
            navigate('/login');
            return;
        }

        let cartData = structuredClone(cartItems);
        
        if (quantity === 0) {
            delete cartData[itemId];
           
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);

        try {
            await axios.post(backendUrl + '/api/cart/update', { itemId, quantity }, { headers: { token } })
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }




    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            totalCount += cartItems[items];
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = Books.find((book) => book._id === items);
            if (itemInfo) {
                totalAmount += itemInfo.price * cartItems[items];
            }
        }
        return totalAmount;
    }

    const placeOrder = (orderData) => {
        const orderItems = [];
        for (const itemId in cartItems) {
            const itemInfo = Books.find((book) => book._id === itemId);
            if (itemInfo) {
                orderItems.push({
                    ...itemInfo,
                    quantity: cartItems[itemId]
                });
            }
        }
        
        const newOrder = {
            id: Date.now(),
            items: orderItems,
            totalAmount: getCartAmount(),
            deliveryFee: delivery_fee,
            orderData: orderData,
            date: new Date().toLocaleDateString()
        };
        
        setOrders([...orders, newOrder]);
        setCartItems({});
        return newOrder;
    }

    const logout = () => {
        setToken('')
        setCartItems({})
        setOrders([])
        localStorage.removeItem('token')
    }

    const verifyTokenWithBackend = async (userToken) => {
        try {
            const res = await axios.post(backendUrl + '/api/user/verify-token', {}, { headers: { token: userToken } })
            if (!res.data.success) {
                // Token is invalid, user was removed from database
                logout();
                return false;
            }
            return true;
        } catch (err) {
            console.log('Token verification error:', err)
            logout();
            return false;
        }
    }

    const getUserOrders = async (userToken) => {
        try {
            const res = await axios.post(backendUrl + '/api/order/userorders', {}, { headers: { token: userToken } })
            if (res.data && res.data.success) {
                setOrders(res.data.orders || [])
            }
        } catch (err) {
            console.log('Error loading orders:', err)
        }
    }

    const getBooksData = async ()=>{
        try{
            const response = await axios.get(backendUrl + "/api/book/list")
            if(response.data.success){
                const booksFromApi = response.data.books || response.data.Books;
                if (Array.isArray(booksFromApi)) {
                    setBooks([...booksFromApi].reverse());
                } else {
                    setBooks([]);
                }
            }

        }catch(error){
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        getBooksData();
    },[])


    // Load cart from backend when token becomes available
    useEffect(()=>{
       const loadCart = async () => {
           if (!token) return;
           
           // Verify token validity first
           const isValid = await verifyTokenWithBackend(token);
           if (!isValid) return;
           
           try {
               const res = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
               if (res.data && res.data.success) {
                   setCartItems(res.data.cartData || {})
               }
           } catch (err) {
               console.log('Error loading cart:', err)
           }
       }
       loadCart()
    },[token])

    // Load orders from backend when token becomes available
    useEffect(()=>{
       if (!token) {
           setOrders([])
           return
       }
       getUserOrders(token)
    },[token])


    const value = {
        currency,
        delivery_fee,
        Books,
        setOrders,
        getUserOrders,
        addToCart,
        updateQuantity,
        cartItems,
        setCartItems,
        navigate,
        getCartCount,
        getCartAmount,
        placeOrder,
        orders,
        backendUrl,
        token,
        setToken,
        logout,
        isTokenLoaded,
        verifyTokenWithBackend,
        isCartOpen,
        setIsCartOpen,
        search,
        setSearch,
        showSearch,
        setShowSearch
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )



}

export default ShopContextProvider;


