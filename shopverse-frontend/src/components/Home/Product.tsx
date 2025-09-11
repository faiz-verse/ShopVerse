import React, { useState } from 'react'
import './Product.css'

// for react icons
import { type IconBaseProps } from 'react-icons'
import { BsChevronDown, BsX, BsArrowClockwise, BsStar, BsStarFill, BsHeart, BsHeartFill } from 'react-icons/bs'
import { PiSlidersHorizontal } from "react-icons/pi";

// to import json data
import productData from '../../assets/products.json'

const Product = () => {

    const BsArDown = BsChevronDown as React.ComponentType<IconBaseProps>
    const BsClose = BsX as React.ComponentType<IconBaseProps>
    const BsRefresh = BsArrowClockwise as React.ComponentType<IconBaseProps>
    const PiSlider = PiSlidersHorizontal as React.ComponentType<IconBaseProps>
    const BsStarEmpty = BsStar as React.ComponentType<IconBaseProps>
    const BsStarFilled = BsStarFill as React.ComponentType<IconBaseProps>
    const BsDil = BsHeart as React.ComponentType<IconBaseProps>
    // const BsDilFill = BsHeartFill as React.ComponentType<IconBaseProps>

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

    // let priceRange: { min?: number, max?: number } = {}
    // const [minPrice, setMinPrice] = useState<number>()
    // const [maxPrice, setMaxPrice] = useState<number>()
    // const handlePriceFilter = () => {
    //     priceRange = { min: minPrice, max: maxPrice };
    //     console.log(priceRange)
    // }

    // -------------------------------- FOR PRODUCT --------------------------------------
    const hasActiveFilter = (): boolean => {
        for (const key in filters) {
            if (filters[key as keyof Filters] !== "") {
                return true
            }
        }
        return false
    };


    return (
        <>

            {/* ------------------------------------ FILTER ------------------------------------ */}
            <div id='filters'>
                <div className='filter' id='category' onClick={() => { handleFilterClick("category") }}>
                    <span>{filters.category === "" ? "Category" : filters.category}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.category === "" ? "flex" : "none", rotate: isFilterActive.category === true ? '-90deg' : '0deg' }} />
                    <BsClose size={20} color='black' strokeWidth={1} style={{ display: filters.category === "" ? "none" : "flex" }} onClick={() => setFilters(prev => ({ ...prev, category: "" }))} />
                    <div className='options'>
                        {productCategories.map((c, index) => (
                            <div className='option' key={index} onClick={() => setFilters(prev => ({ ...prev, category: c.category }))}>{c.category} <span>{c.repetition}</span> </div>
                        ))}
                    </div>
                </div>
                <div className='filter' id='type' onClick={() => { handleFilterClick("type") }}>
                    <span>{filters.type === "" ? "Type" : filters.type}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.type === "" ? "flex" : "none", rotate: isFilterActive.type === true ? '-90deg' : '0deg' }} />
                    <BsClose size={20} color='black' strokeWidth={1} style={{ display: filters.type === "" ? "none" : "flex" }} onClick={() => setFilters(prev => ({ ...prev, type: "" }))} />
                    <div className='options'>
                        {productTypes.map((t, index) => (
                            <div className='option' key={index} onClick={() => setFilters(prev => ({ ...prev, type: t.type }))}>{t.type} <span>{t.repetition}</span> </div>
                        ))}
                    </div>
                </div>
                <div className='filter' id="price" onClick={() => { handleFilterClick("price") }}>
                    <span>{filters.price === "" ? "Price" : filters.price}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.price === "" ? "flex" : "none", rotate: isFilterActive.price === true ? '-90deg' : '0deg' }} />
                    <BsClose size={20} color='black' strokeWidth={1} style={{ display: filters.price === "" ? "none" : "flex" }} onClick={() => setFilters(prev => ({ ...prev, price: "" }))} />
                    <div className='options'>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, price: "< 200" })); }}>{'< 200'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, price: "< 500" })); }}>{'< 500'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, price: "< 800" })); }}>{'< 800'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, price: "< 1200" })); }}>{'< 1200'}</div>
                        {/* <div className="option">
                            Max: <input type="number" step={100} onChange={(e) => setMinPrice(Number(e.target.value))} onKeyDown={(e) => e.key === "Enter" && handlePriceFilter()} />
                            Min: <input type='number' step={100} onChange={(e) => setMaxPrice(Number(e.target.value))} onKeyDown={(e) => e.key === "Enter" && handlePriceFilter()} />
                            <button onClick={() => {
                                handlePriceFilter();
                                setFilters(prev => {
                                    let priceLabel = '';
                                    if (typeof priceRange.max === 'number' && typeof priceRange.min === 'number') {
                                        priceLabel = priceRange.max > priceRange.min
                                            ? `< ${priceRange.max} and > ${priceRange.min}`
                                            : `< ${priceRange.min} and > ${priceRange.max}`;
                                    } else if (typeof priceRange.max === 'number') {
                                        priceLabel = `< ${priceRange.max}`;
                                    } else if (typeof priceRange.min === 'number') {
                                        priceLabel = `> ${priceRange.min}`;
                                    }
                                    return { ...prev, price: priceLabel };
                                });
                            }}>Apply</button>
                        </div> */}
                    </div>
                </div>
                <div className='filter' id="rating" onClick={() => { handleFilterClick("rating") }}>
                    <span>{filters.rating === "" ? "Rating" : filters.rating}</span>
                    <BsArDown size={16} color='black' strokeWidth={1} style={{ display: filters.rating === "" ? "flex" : "none", rotate: isFilterActive.rating === true ? '-90deg' : '0deg' }} />
                    <BsClose size={20} color='black' strokeWidth={1} style={{ display: filters.rating === "" ? "none" : "flex" }} onClick={() => setFilters(prev => ({ ...prev, rating: "" }))} />
                    <div className='options'>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, rating: "4" })); }}>{'⭐⭐⭐⭐'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, rating: "3" })); }}>{'⭐⭐⭐'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, rating: "2" })); }}>{'⭐⭐'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, rating: "1" })); }}>{'⭐'}</div>
                    </div>
                </div>
                <div className='filter' id='reset-filters' onClick={() => { setFilters(initialFilters); setIsFilterActive(initialIsActive) }}>
                    <span>Reset</span>
                    <BsRefresh size={16} color='black' strokeWidth={1} />
                </div>
                <div className='filter' id='sortby' onClick={() => { handleFilterClick("sortby") }}>
                    <span>{filters.sortby === "" ? "Sort by" : filters.sortby}</span>
                    <PiSlider size={16} color='black' strokeWidth={1} style={{ display: filters.sortby === "" ? "flex" : "none" }} />
                    <BsClose size={20} color='black' strokeWidth={1} style={{ display: filters.sortby === "" ? "none" : "flex" }} onClick={() => setFilters(prev => ({ ...prev, sortby: "" }))} />
                    <div className='options'>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, sortby: "A-Z" })); }}>{'A-Z'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, sortby: "Title" })); }}>{'Title'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, sortby: "Price" })); }}>{'Price'}</div>
                        <div className="option" onClick={() => { setFilters(prev => ({ ...prev, sortby: "Rating" })); }}>{'Rating'}</div>
                    </div>
                </div>
            </div>

            {/* -------------------------------- PRODUCTS ------------------------------------- */}
            <div id='product'>
                {hasActiveFilter() ? (
                    <>
                        <h3>Filtered Products</h3>
                        <div id='filtered-product' className='product-grid'>
                            {products
                                .filter(product => {
                                    // category filter
                                    if (filters.category && product.category !== filters.category) return false;

                                    // type filter
                                    if (filters.type && product.type !== filters.type) return false;

                                    // price filter (your filters.price is a string like "< 500")
                                    if (filters.price) {
                                        const maxPrice = parseInt(filters.price.replace("<", "").trim());
                                        if (product.price * 2 >= maxPrice) return false;
                                    }

                                    // rating filter
                                    if (filters.rating && product.rating < Number(filters.rating)) return false;

                                    // sortby will be applied later, not a filter here
                                    return true;
                                })
                                // sorting logic
                                .sort((a, b) => {
                                    switch (filters.sortby) {
                                        case "A-Z":
                                        case "Title":
                                            return a.title.localeCompare(b.title);
                                        case "Price":
                                            return a.price - b.price;
                                        case "Rating":
                                            return b.rating - a.rating;
                                        default:
                                            return 0;
                                    }
                                })
                                .map((product, index) => (
                                    <div key={index} className='product-card'>
                                        <div className='pc-top'>
                                            <img src={""} alt="img" loading='lazy' />
                                            <div className='pc-add-wishlist'>
                                                <BsDil className='bs-dil' size={20} color='purple'></BsDil>
                                            </div>
                                        </div>
                                        <div className='pc-middle'>
                                            <div className='pc-title'>{product.title}</div>
                                            <div className='pc-price'>₹{product.price * 2}</div>
                                        </div>
                                        <div className='pc-bottom'>
                                            <div className='pc-description'>{product.description}</div>
                                            <div className='pc-rating'>{Array.from({ length: 5 }).map((_, i) => (
                                                <span key={i}>{
                                                    (i < product.rating) ? <BsStarFilled size={18} color='purple' /> : <BsStarEmpty size={18} color='purple' />
                                                }</span>
                                            ))}
                                            </div>
                                        </div>
                                        <button className='add-cart-btn'>Add to cart</button>
                                    </div>
                                ))}
                        </div>
                    </>
                ) :
                    (
                        <>
                            {/* New Products */}
                            <h3>Newly Added</h3>
                            <div id='new-product' className='product-grid'>
                                {products.filter(p => p.isNew).map((np, index) => {
                                    return (
                                        <div key={index} className='product-card'>
                                            <div className='pc-top'>
                                                <img src={""} alt="img" loading='lazy' />
                                                <div className='pc-add-wishlist'>
                                                    <BsDil className='bs-dil' size={20} color='purple'></BsDil>
                                                </div>
                                            </div>
                                            <div className='pc-middle'>
                                                <div className='pc-title'>{np.title}</div>
                                                <div className='pc-price'>₹{np.price * 2}</div>
                                            </div>
                                            <div className='pc-bottom'>
                                                <div className='pc-description'>{np.description}</div>
                                                <div className='pc-rating'>{Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i}>{
                                                        (i < np.rating) ? <BsStarFilled size={18} color='purple' /> : <BsStarEmpty size={18} color='purple' />
                                                    }</span>
                                                ))}
                                                </div>
                                            </div>
                                            <button className='add-cart-btn'>Add to cart</button>
                                        </div>
                                    )
                                })}
                            </div>

                            {/* Highly Rated */}
                            <h3>Popular Products</h3>
                            <div id='new-product' className='product-grid'>
                                {products.filter(p => p.rating >= 4).sort((a, b) => b.rating - a.rating).map((np, index) => {
                                    return (
                                        <div key={index} className='product-card'>
                                            <div className='pc-top'>
                                                <img src={""} alt="img" loading='lazy' />
                                                <div className='pc-add-wishlist'>
                                                    <BsDil className='bs-dil' size={20} color='purple'></BsDil>
                                                </div>
                                            </div>
                                            <div className='pc-middle'>
                                                <div className='pc-title'>{np.title}</div>
                                                <div className='pc-price'>₹{np.price * 2}</div>
                                            </div>
                                            <div className='pc-bottom'>
                                                <div className='pc-description'>{np.description}</div>
                                                <div className='pc-rating'>{Array.from({ length: 5 }).map((_, i) => (
                                                    <span key={i}>{
                                                        (i < np.rating) ? <BsStarFilled size={18} color='purple' /> : <BsStarEmpty size={18} color='purple' />
                                                    }</span>
                                                ))}
                                                </div>
                                            </div>
                                            <button className='add-cart-btn'>Add to cart</button>
                                        </div>
                                    )
                                })}
                            </div>

                            {productCategories.map((c, cin) => {
                                return (
                                    <>
                                        <h3>Products for {c.category}</h3>
                                        <div className='product-grid'>
                                            {products.filter(p => p.category === c.category).map((np, index) => {
                                                return (
                                                    <div key={index} className='product-card'>
                                                        <div className='pc-top'>
                                                            <img src={""} alt="img" loading='lazy' />
                                                            <div className='pc-add-wishlist'>
                                                                <BsDil className='bs-dil' size={20} color='purple'></BsDil>
                                                            </div>
                                                        </div>
                                                        <div className='pc-middle'>
                                                            <div className='pc-title'>{np.title}</div>
                                                            <div className='pc-price'>₹{np.price * 2}</div>
                                                        </div>
                                                        <div className='pc-bottom'>
                                                            <div className='pc-description'>{np.description}</div>
                                                            <div className='pc-rating'>{Array.from({ length: 5 }).map((_, i) => (
                                                                <span key={i}>{
                                                                    (i < np.rating) ? <BsStarFilled size={18} color='purple' /> : <BsStarEmpty size={18} color='purple' />
                                                                }</span>
                                                            ))}
                                                            </div>
                                                        </div>
                                                        <button className='add-cart-btn'>Add to cart</button>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                )
                            })}
                        </>
                    )
                }

            </div>

        </>
    )
}

export default Product