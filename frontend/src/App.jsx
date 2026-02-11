import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Navbar from './components/Navbar'
import SearchBar from './components/SearchBar'
import Collection from './page/Collection'
import BookDetail from './page/bookDetail'
import Footer from './components/footer.jsx'
import Cart from './page/cart.jsx'
import PlaceOrder from './page/PlaceOrder.jsx'
import Orders from './page/Orders.jsx'
import Login from './page/login.jsx'
import Signup from './page/signup.jsx'
import ProtectedRoute from './components/ProtectedRoute'
import AboutPage from "./page/about.jsx"
import ContactPage from "./page/contact.jsx"
import Verify from "./page/verify.jsx"

function App() {
  return (
   <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
    <Navbar/>
    <SearchBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/collection' element={<Collection/>}/>
      <Route path='/book/:bookId' element={<BookDetail/>}/>
      <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
      <Route path='/place-order' element={<ProtectedRoute><PlaceOrder/></ProtectedRoute>}/>
      <Route path='/orders' element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
      <Route path = '/login' element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path = "/about" element={<AboutPage/>}/>
      <Route path = "/contact"  element={<ContactPage/>}/>
      <Route path = "/verify" element={<Verify/>}/>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App