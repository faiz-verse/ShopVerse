import React from 'react'
import './Nav.css'

import { Link } from 'react-router'

import { type IconBaseProps } from 'react-icons'
import { BsSearchHeart, BsPersonHeart, BsBoxArrowInRight, BsCart2 } from 'react-icons/bs'

const Nav = () => {

    const BsSearch = BsSearchHeart as React.ComponentType<IconBaseProps>;
    const BsPerson = BsPersonHeart as React.ComponentType<IconBaseProps>;
    const BsLogin = BsBoxArrowInRight as React.ComponentType<IconBaseProps>;
    const BsCart = BsCart2 as React.ComponentType<IconBaseProps>;

    return (
        <div id='Nav'>
            <div id='title'>
                <img src="shopping-cart.png" alt="logo" />
                <span>ShopVerse</span>
            </div>
            <div id='nav-search'>
                <input type="text" placeholder='Search Product' />
                <BsSearch id='search-icon' size={24} color='rgb(150, 150, 150)' />
            </div>
            <ul id='nav-pages'>
                <Link to="/cart"><li>Cart <BsCart id='search-icon' size={24} color='black' /></li></Link>
                <Link to="/login"><li>Log in <BsLogin id='search-icon' size={24} color='black' /></li></Link>
                <Link to="/profile"><li>Profile <BsPerson id='search-icon' size={24} color='black' /></li></Link>
            </ul>
        </div>
    )
}

export default Nav