import React, { useEffect, useRef, useState } from 'react'
import './Home.css'
// import { Link } from 'react-router'

// for react icons
import { type IconBaseProps } from 'react-icons'
import { BsArrowRight, BsArrowLeft, BsChevronDown, BsX, BsArrowClockwise } from 'react-icons/bs'
import { PiSlidersHorizontal } from "react-icons/pi";

// to import json data
import productData from '../assets/products.json'
import bannerData from '../assets/banner.json'

const Home = () => {

    const BsArRight = BsArrowRight as React.ComponentType<IconBaseProps>
    const BsArLeft = BsArrowLeft as React.ComponentType<IconBaseProps>
    const BsArDown = BsChevronDown as React.ComponentType<IconBaseProps>
    const BsClose = BsX as React.ComponentType<IconBaseProps>
    const BsRefresh = BsArrowClockwise as React.ComponentType<IconBaseProps>
    const PiSlider = PiSlidersHorizontal as React.ComponentType<IconBaseProps>

    // ----------------------- FOR PRODUCTS --------------------------
    const products = productData.data
    const productTypes: { type: string, repetition: number }[] = []
    const productCategories: { category: string, repetition: number }[] = []
    const newProducts: number[] = []
    products.forEach((product) => {

        // finding types with their number of occurrences/ repetitions
        const foundType = productTypes.find((p) => p.type === product.type)
        if (foundType)
            foundType.repetition += 1
        else
            productTypes.push({ type: product.type, repetition: 1 })

        // finding types with their number of occurrences/ repetitions
        const foundCategory = productCategories.find((p) => p.category === product.category)
        if (foundCategory)
            foundCategory.repetition += 1
        else
            productCategories.push({ category: product.category, repetition: 1 })

        // for getting new products
        if (product.isNew)
            newProducts.push(product._id)
    })
    // productTypes.forEach((c) => console.log(c.type, " ", c.repetition))
    // productCategories.forEach((p) => console.log(p.category, " ", p.repetition))


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

    // --------------------------- for FILTER ----------------------------
    type FilterKey = "category" | "type" | "price" | "rating" | "sortby";
    type Filters = Record<FilterKey, string>;
    type FilterActiveState = Record<FilterKey, boolean>;
    const initialFilters: Filters = {
        category: "",
        type: "",
        price: "",
        rating: "",
        sortby: ""
    };
    const initialIsActive: FilterActiveState = {
        category: false,
        type: false,
        price: false,
        rating: false,
        sortby: false
    };
    const [filters, setFilters] = useState<Filters>(initialFilters);
    const [isFilterActive, setIsFilterActive] = useState<FilterActiveState>(initialIsActive);
    const handleFilterClick = (key: FilterKey) => {
        setIsFilterActive(prev => {
            const updated: FilterActiveState = {
                category: false,
                type: false,
                price: false,
                rating: false,
                sortby: false
            };
            if (!prev[key]) {
                updated[key] = true;
            }
            // to handle active class
            const selectedFilter: NodeListOf<HTMLDivElement> = document.querySelectorAll(`#filters .filter`)
            selectedFilter?.forEach(element => {
                if (element.id === key && updated[key] === true) {
                    element.classList.add('active')
                }
                else {
                    element.classList.remove('active')
                }
            });
            return updated;
        });
    };

    let priceRange: { min?: number, max?: number } = {}
    const [minPrice, setMinPrice] = useState<number>()
    const [maxPrice, setMaxPrice] = useState<number>()
    const handlePriceFilter = () => {
        priceRange = { min: minPrice, max: maxPrice };
        console.log(priceRange)
    }

    return (
        <div id='Home'>
            {/* ------------------------------------ BANNER ------------------------------------ */}
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

            {/* ------------------------------------ FILTER ------------------------------------ */}
            <div id='filters'>
                <div className='filter' id='category' onClick={() => { handleFilterClick("category") }}>
                    <span>{filters.category === "" ? "Category" : filters.category}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.category === "" ? "flex" : "none", rotate: isFilterActive.category === true ? '-90deg' : '0deg' }} />
                    <BsClose size={18} color='black' strokeWidth={1} style={{ display: filters.category === "" ? "none" : "flex" }} />
                    <div className='options'>
                        {productCategories.map((c, index) => (
                            <div className='option' key={index} onClick={() => setFilters(prev => ({ ...prev, category: c.category }))}>{c.category} <span>{c.repetition}</span> </div>
                        ))}
                    </div>
                </div>
                <div className='filter' id='type' onClick={() => { handleFilterClick("type") }}>
                    <span>{filters.type === "" ? "Type" : filters.type}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.type === "" ? "flex" : "none", rotate: isFilterActive.type === true ? '-90deg' : '0deg' }} />
                    <BsClose size={18} color='black' strokeWidth={1} style={{ display: filters.type === "" ? "none" : "flex" }} />
                    <div className='options'>
                        {productTypes.map((t, index) => (
                            <div className='option' key={index} onClick={() => setFilters(prev => ({ ...prev, type: t.type }))}>{t.type} <span>{t.repetition}</span> </div>
                        ))}
                    </div>
                </div>
                <div className='filter' id="price">
                    <span onClick={() => { handleFilterClick("price") }}>{filters.price === "" ? "Price" : filters.price}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.price === "" ? "flex" : "none", rotate: isFilterActive.price === true ? '-90deg' : '0deg' }} />
                    <BsClose size={18} color='black' strokeWidth={1} style={{ display: filters.price === "" ? "none" : "flex" }} />
                    <div className='options'>
                        <div className="option" onClick={() => { priceRange = { max: 200 }; setFilters(prev => ({ ...prev, price: "< 200" })); }}>{'< 200'}</div>
                        <div className="option" onClick={() => { priceRange = { max: 500 }; setFilters(prev => ({ ...prev, price: "< 500" })); }}>{'< 500'}</div>
                        <div className="option" onClick={() => { priceRange = { max: 800 }; setFilters(prev => ({ ...prev, price: "< 800" })); }}>{'< 800'}</div>
                        <div className="option" onClick={() => { priceRange = { max: 1200 }; setFilters(prev => ({ ...prev, price: "< 1200" })); }}>{'< 1200'}</div>
                        <div className="option">
                            Max: <input type="number" step={100} onChange={(e) => setMinPrice(Number(e.target.value))} onKeyDown={(e) => e.key === "Enter" && handlePriceFilter()} />
                            Min: <input type='number' step={100} onChange={(e) => setMaxPrice(Number(e.target.value))} onKeyDown={(e) => e.key === "Enter" && handlePriceFilter()} />
                            <button onClick={() => {
                                handlePriceFilter();
                                setFilters(prev => ({ ...prev, price: (priceRange.max || priceRange.min) ? (priceRange.max > priceRange.min) ? `< ${priceRange.max} and > ${priceRange.min}` : `< ${priceRange.min} and > ${priceRange.max}` : `` }));
                            }}>Apply</button>
                        </div>
                    </div>
                </div>
                <div className='filter' id="rating" onClick={() => { handleFilterClick("rating") }}>
                    <span>{filters.rating === "" ? "Rating" : filters.rating}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.rating === "" ? "flex" : "none", rotate: isFilterActive.rating === true ? '-90deg' : '0deg' }} />
                    <BsClose size={18} color='black' strokeWidth={1} style={{ display: filters.rating === "" ? "none" : "flex" }} />
                    <div className='options'>
                    </div>
                </div>
                <div className='filter' id='reset-filters' onClick={() => { setFilters(initialFilters); setIsFilterActive(initialIsActive) }}>
                    <span>Reset</span>
                    <BsRefresh size={16} color='black' strokeWidth={1} />
                </div>
                <div className='filter' id='sortby' onClick={() => { handleFilterClick("sortby") }}>
                    <span>{filters.sortby === "" ? "Sort by" : filters.sortby}</span>
                    <PiSlider size={16} color='black' strokeWidth={1} style={{ display: filters.sortby === "" ? "flex" : "none" }} />
                    <BsClose size={18} color='black' strokeWidth={1} style={{ display: filters.sortby === "" ? "none" : "flex" }} />
                    <div className='options'>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home