import React, { useEffect, useRef } from 'react'
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


    // for banner
    const [currentBanner, setCurrentBanner] = React.useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBanner(prev => (prev === banner.length ? 0 : prev + 1))
        }, 5000)
        return () => clearInterval(interval)
    }, [banner.length])

    // for the last clone banner
    useEffect(() => {
        if (currentBanner === banner.length) {
            // wait until transition ends
            const timeout = setTimeout(() => {
                setCurrentBanner(0); // jump back to start
            }, 700); // match your transition duration
            return () => clearTimeout(timeout);
        }
    }, [currentBanner, banner.length]);

    // handling prev and next
    // const handlePrev = () => {
    //     setCurrentBanner((prev) => (prev === 0 ? banner.length : prev - 1));
    // };
    const handleNext = () => {
        setCurrentBanner((prev) => (prev === banner.length ? 0 : prev + 1));
    };

    return (
        <div id='Home'>
            <div id='banner-wrapper'>
                <div id='banner'>
                    <div
                        style={{
                            display: 'flex',
                            transition: 'transform 0.7s cubic-bezier(0.77,0,0.18,1)',
                            transform: `translateX(-${currentBanner * 100}%)`,
                            transitionDuration: currentBanner === 0 ? "0s" : "0.7s"
                        }}
                    >
                        {banner.map((b, index) => (
                            <div key={index} className="banner-content" style={{ flexShrink: 0, fontStyle: b.fontStyle, color: b.fontColor }}>
                                <img src={b.imageLink} alt="banner image" loading='lazy' />
                                <div className='banner-details' style={{
                                    left: b.position === "left" ? "50px" : "none",
                                    right: b.position === "right" ? "50px" : "none"
                                }}>
                                    <div className='banner-title' style={{ fontSize: b.titleFontSize, fontFamily: b.titleFontFamily }}>{b.title}</div>
                                    <div className='banner-info' style={{ fontSize: b.descriptionFontSize, fontFamily: b.descriptionFontFamily }}>{b.description}</div>
                                    <button className='redirect-button' style={{ background: b.redirectButtonColor, color: b.redirectButtonTextColor }}>{b.redirectButtonText}</button>
                                </div>
                            </div>
                        ))}
                        {/* last banner = first banner */}
                        <div className="banner-content" style={{ flexShrink: 0, fontStyle: banner[0].fontStyle, color: banner[0].fontColor }}>
                            <img src={banner[0].imageLink} alt="banner image" loading='lazy' />
                            <div className='banner-details' style={{
                                left: banner[0].position === "left" ? "50px" : "none",
                                right: banner[0].position === "right" ? "50px" : "none"
                            }}>
                                <div className='banner-title' style={{ fontSize: banner[0].titleFontSize, fontFamily: banner[0].titleFontFamily }}>{banner[0].title}</div>
                                <div className='banner-info' style={{ fontSize: banner[0].descriptionFontSize, fontFamily: banner[0].descriptionFontFamily }}>{banner[0].description}</div>
                                <button className='redirect-button' style={{ background: banner[0].redirectButtonColor, color: banner[0].redirectButtonTextColor }}>{banner[0].redirectButtonText}</button>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <button className='banner-button' id='banner-before' onClick={handlePrev}>
                    <BsArLeft size={24} color='purple' />
                </button> */}
                <button className='banner-button' id='banner-after' onClick={handleNext}>
                    <BsArRight size={24} color='purple' />
                </button>
            </div>

            <div id='products'>

            </div>
        </div>
    )
}

export default Home