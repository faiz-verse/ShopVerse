import React from 'react';

import './Footer.css';

function Footer() {
    return (
        <footer id="Footer">
            <div className="footer-container">
                {/* Brand Section */}
                <div className="footer-brand">
                    <h2>ShopVerse</h2>
                    <p>Your fashion, your style. Discover the latest trends with us.</p>
                </div>

                {/* Quick Links */}
                <div className="footer-links">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a>Shop</a></li>
                        <li><a>About Us</a></li>
                        <li><a>Contact</a></li>
                        <li><a>FAQ</a></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="footer-service">
                    <h4>Customer Service</h4>
                    <ul>
                        <li><a>Returns & Exchanges</a></li>
                        <li><a>Shipping Info</a></li>
                        <li><a>Support</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div className="footer-social">
                    <h4>Follow Us</h4>
                    <div className="social-icons">
                        <a><i className="fab fa-facebook-f"></i></a>
                        <a><i className="fab fa-instagram"></i></a>
                        <a><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} Shopverse. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
