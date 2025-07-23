import React from 'react'
import './Nav.css'

import { Link } from 'react-router'

import { type IconBaseProps } from 'react-icons'
import { BsSearchHeart } from 'react-icons/bs'

const Nav = () => {

    const BsSearch = BsSearchHeart as React.ComponentType<IconBaseProps>;

    return (
        <div id='Nav'>
            <div id='title'>
                <img src="shopping-cart.png" alt="logo" />
                <span>ShopVerse</span>
            </div>
            <ul id='nav-pages'>
                <div id='nav-search'>
                    <input type="text" placeholder='Search Product' />
                    <BsSearch id='search-icon' size={24} color='gray' />
                </div>
                <Link to="/cart"><li>Cart</li></Link>
                <Link to="/order-history"><li>Order History</li></Link>
                <Link to="/login"><li>Log in</li></Link>
                <Link to="/profile"><li>Profile</li></Link>
                <Link to="/admin-dashboard"><li>Admin Dashboard</li></Link>
            </ul>
        </div>
    )
}

export default Nav