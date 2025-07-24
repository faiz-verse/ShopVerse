import React from 'react'
import './Home.css'
// import { Link } from 'react-router'

// for react icons
import { type IconBaseProps } from 'react-icons'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'

// to import json data
import productData from '../assets/products.json'
import bannerData from '../assets/banner.json'

const Home = () => {

    const BsArRight = BsArrowRight as React.ComponentType<IconBaseProps>
    const BsArLeft = BsArrowLeft as React.ComponentType<IconBaseProps>

    const products = productData.data
    const banner = bannerData

    const productTypes: { type: string, repetition: number }[] = []
    const newProducts: number[] = []
    products.forEach((i) => {
        // for finding and increasing the repetition if exists
        const found = productTypes.find((p) => p.type === i.type)
        if (found)
            found.repetition += 1
        else
            productTypes.push({ type: i.type, repetition: 1 })
        // for getting new products
        if (i.isNew)
            newProducts.push(i._id)
    })
    productTypes.forEach((c) => console.log(c.type, " ", c.repetition))


    return (
        <div id='Home'>
            <div id='banner'>
                {banner.map((b, index) => {
                    return (
                        <div key={index} className="banner-content" style={{ ["--position" as any]: `${index}`, fontStyle: b.fontStyle, color: b.fontColor }}>
                            <img src={b.imageLink} alt="banner image" />
                            <div className='banner-details'>
                                <div className='banner-title' style={{ fontSize: b.titleFontSize, fontFamily: b.titleFontFamily }}>{b.title}</div>
                                <div className='banner-info' style={{ fontSize: b.descriptionFontSize, fontFamily: b.descriptionFontFamily }}>{b.description}</div>
                                <button className='redirect-button' style={{ background: b.redirectButtonColor }}>{b.redirectButtonText}</button>
                            </div>
                        </div>
                    );
                })}

                <button className='banner-button' id='banner-before'>
                    <BsArLeft size={24} color='black' />
                </button>
                <button className='banner-button' id='banner-after'>
                    <BsArRight size={24} color='black' />
                </button>
            </div>

            <div id='products'>

            </div>
        </div>
    )
}

export default Home