import React from 'react'
import './Home.css'
import { Link } from 'react-router'

const Home = () => {
    return (
        <div>Home
            <ul id='nav'>
                <Link to="/"><li>Home</li></Link>
                <Link to="/products"><li>Products</li></Link>
                <Link to="/product-details"><li>Product Details</li></Link>
                <Link to="/cart"><li>Cart</li></Link>
                <Link to="/checkout"><li>Checkout</li></Link>
                <Link to="/order-history"><li>Order History</li></Link>
                <Link to="/login"><li>Log in</li></Link>
                <Link to="/profile"><li>Profile</li></Link>
                <Link to="/admin-dashboard"><li>Admin Dashboard</li></Link>
            </ul>
        </div>
    )
}

export default Home