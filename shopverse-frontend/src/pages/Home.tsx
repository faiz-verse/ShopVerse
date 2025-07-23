import React from 'react'
import './Home.css'
import { Link } from 'react-router'

// for react icons
import { type IconBaseProps } from 'react-icons'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'

// to import json data
import data from '../assets/products.json'

const Home = () => {

    const BsArRight = BsArrowRight as React.ComponentType<IconBaseProps>
    const BsArLeft = BsArrowLeft as React.ComponentType<IconBaseProps>

    return (
        <div id='Home'>
            <div id='banner'>
                <div id='banner-content'>
                    <div className="banner">
                        <div className='banner-info'></div>
                        <button className='redirect-button'></button>
                    </div>
                    <div className="banner">
                        <div className='banner-info'></div>
                        <button className='redirect-button'></button>
                    </div>
                    <div className="banner">
                        <div className='banner-info'></div>
                        <button className='redirect-button'></button>
                    </div>
                </div>
                <button className='banner-button' id='banner-before'>
                    <BsArLeft size={24} color='black' />
                </button>
                <button className='banner-button' id='banner-after'>
                    <BsArRight size={24} color='black' />
                </button>
            </div>
        </div>
    )
}

export default Home