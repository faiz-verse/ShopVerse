import React, { useState } from 'react'
import './Nav.css'

import { Link } from 'react-router'

import { type IconBaseProps } from 'react-icons'
import { BsSearchHeart, BsPersonHeart, BsBoxArrowInRight, BsCart2, BsList, BsX } from 'react-icons/bs'

const Nav = () => {

    const BsSearch = BsSearchHeart as React.ComponentType<IconBaseProps>
    const BsPerson = BsPersonHeart as React.ComponentType<IconBaseProps>
    const BsLogin = BsBoxArrowInRight as React.ComponentType<IconBaseProps>
    const BsCart = BsCart2 as React.ComponentType<IconBaseProps>
    const BsMenu = BsList as React.ComponentType<IconBaseProps>
    const BsClose = BsX as React.ComponentType<IconBaseProps>

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div id='Nav'>
            <Link to="/" className='link'>
                <div id='title'>
                    <img src="shopping-cart.png" alt="logo" />
                    <span>ShopVerse</span>
                </div>
            </Link>
            <div id='nav-search'>
                <input type="text" placeholder='Search Product' />
                <BsSearch id='search-icon' size={24} color='rgb(150, 150, 150)' />
            </div>
            <ul id='nav-pages'>
                <Link to="/cart"><li>Cart <BsCart id='search-icon' size={24} color='black' /></li></Link>
                <Link to="/login"><li>Log in <BsLogin id='search-icon' size={24} color='black' /></li></Link>
                <Link to="/profile"><li>Profile <BsPerson id='search-icon' size={24} color='black' /></li></Link>
            </ul>

            {/* Menu */}
            <div id='nav-expand'>
                <BsMenu id='nav-ham' size={24} color='black' onClick={() => setIsExpanded(!isExpanded)} />
                <div id='nav-options' style={{ right: isExpanded ? '0px' : '-100vw' }}>
                    <BsClose size={24} color='black' onClick={() => setIsExpanded(!isExpanded)} />
                    <ul>
                        <Link to="/cart"><li onClick={() => setIsExpanded(!isExpanded)}>Cart <BsCart id='search-icon' size={24} color='black' /></li></Link>
                        <Link to="/login"><li onClick={() => setIsExpanded(!isExpanded)}>Log in <BsLogin id='search-icon' size={24} color='black' /></li></Link>
                        <Link to="/profile"><li onClick={() => setIsExpanded(!isExpanded)}>Profile <BsPerson id='search-icon' size={24} color='black' /></li></Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Nav