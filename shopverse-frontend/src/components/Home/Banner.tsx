import React, { useEffect } from 'react'
import './Banner.css'
// for react icons
import { type IconBaseProps } from 'react-icons'
import { BsArrowRight, BsArrowLeft } from 'react-icons/bs'
// for banner.json
import bannerData from '../../assets/banner.json'

const Banner = () => {
    // Arrow Icons
    const BsArRight = BsArrowRight as React.ComponentType<IconBaseProps>
    const BsArLeft = BsArrowLeft as React.ComponentType<IconBaseProps>

    // ------------------------- for BANNER ----------------------------
    const banner = bannerData
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
    const handlePrev = () => {
        setCurrentBanner((prev) => (prev === 0 ? banner.length - 1 : prev - 1));
    };
    const handleNext = () => {
        setCurrentBanner((prev) => (prev === banner.length ? 0 : prev + 1));
    };

    return (
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
                            <img src={b.imageLink} alt="banner image" loading='lazy' onLoad={(e) => e.currentTarget.style.opacity = '1'}
                                style={{ opacity: 0, transition: 'opacity 0.3s ease' }} />
                            <div className='banner-details' style={{
                                left: b.position === "left" ? "30px" : "none",
                                right: b.position === "right" ? "30px" : "none",
                                transformOrigin: b.position === "left" ? "0px 0px" : b.position === "right" ? "100% 0%" : "50% 0%"
                            }}>
                                <div className='banner-title' style={{ fontSize: b.titleFontSize, fontFamily: b.titleFontFamily, textAlign: b.position === "left" ? "left" : b.position === "right" ? "right" : "center" }}>{b.title}</div>
                                <div className='banner-info' style={{ fontSize: b.descriptionFontSize, fontFamily: b.descriptionFontFamily, textAlign: b.position === "left" ? "left" : b.position === "right" ? "right" : "center" }}>{b.description}</div>
                                <button className='redirect-button' style={{
                                    background: b.redirectButtonColor, color: b.redirectButtonTextColor,
                                    alignSelf: b.position === "left" ? "start" : b.position === "right" ? "end" : "center"
                                }}>{b.redirectButtonText}</button>
                            </div>
                        </div>
                    ))}
                    {/* last banner = first banner */}
                    <div className="banner-content" style={{ flexShrink: 0, fontStyle: banner[0].fontStyle, color: banner[0].fontColor }}>
                        <img src={banner[0].imageLink} alt="banner image" loading='lazy' onLoad={(e) => e.currentTarget.style.opacity = '1'}
                            style={{ opacity: 0, transition: 'opacity 0.3s ease' }} />
                        <div className='banner-details' style={{
                            left: banner[0].position === "left" ? "30px" : "none",
                            right: banner[0].position === "right" ? "30px" : "none",
                            transformOrigin: banner[0].position === "left" ? "0px 0px" : banner[0].position === "right" ? "100% 0%" : "50% 0%"
                        }}>
                            <div className='banner-title' style={{ fontSize: banner[0].titleFontSize, fontFamily: banner[0].titleFontFamily, textAlign: banner[0].position === "left" ? "left" : banner[0].position === "right" ? "right" : "center" }}>{banner[0].title}</div>
                            <div className='banner-info' style={{ fontSize: banner[0].descriptionFontSize, fontFamily: banner[0].descriptionFontFamily, textAlign: banner[0].position === "left" ? "left" : banner[0].position === "right" ? "right" : "center" }}>{banner[0].description}</div>
                            <button className='redirect-button' style={{
                                background: banner[0].redirectButtonColor, color: banner[0].redirectButtonTextColor,
                                alignSelf: banner[0].position === "left" ? "start" : banner[0].position === "right" ? "end" : "center"
                            }}>{banner[0].redirectButtonText}</button>
                        </div>
                    </div>

                </div>
            </div>
            <button className='banner-button' id='banner-before' onClick={handlePrev}>
                <BsArLeft size={24} color='purple' />
            </button>
            <button className='banner-button' id='banner-after' onClick={handleNext}>
                <BsArRight size={24} color='purple' />
            </button>
        </div>
    )
}

export default Banner