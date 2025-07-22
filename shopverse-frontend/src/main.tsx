import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// For Routing
import { BrowserRouter, Routes, Route } from "react-router";

// Pages
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderHistory from './pages/OrderHistory'
import LogIn from './pages/LogIn'
import Profile from './pages/Profile'
import AdminDashboard from './pages/AdminDashboard'

createRoot(document.getElementById('root')!).render(
    //   <StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product-details" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
    </BrowserRouter>
    //   </StrictMode>,
)
