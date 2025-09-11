// import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
// import { Link } from 'react-router'

// Components
import Banner from '../components/Home/Banner';
import Product from '../components/Home/Product';

const Home = () => {

    return (
        <div id='Home' className='Page'>

            {/* ------------------------------------ BANNER ------------------------------------ */}
            <Banner />

            {/* ------------------------------------ Products ------------------------------------ */}
            <Product />

        </div>
    )
}

export default Home