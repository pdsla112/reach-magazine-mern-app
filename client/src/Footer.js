import React from "react";
import NavLink from "react-router-dom";
import styled from "styled-components";
import facebookLogo from "./assets/facebook-logo.svg";
import instagramLogo from "./assets/instagram-logo.svg";
import twitterLogo from "./assets/twitter-logo.svg";
import pinterestLogo from "./assets/pinterest-logo.svg";

const StyledNavLink = styled(NavLink)`
    color: #282f2f;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #cf1b1b;
    }
`;

class Footer extends React.Component {
    render() {
        return(
            <section className="footer-wrapper">
                <section className="footer-logo-bar">
                    <div className="footer-logo-section"><h1 className="footer-logo">REACH</h1></div>
                    <div className="footer-socials-section">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src={facebookLogo} className="footer-socials" alt="facebook"/></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src={instagramLogo} className="footer-socials" alt="instagram"/></a>
                        <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer"><img src={twitterLogo} className="footer-socials" alt="twitter"/></a>
                        <a href="https://www.pinterest.com.au/" target="_blank" rel="noopener noreferrer"><img src={pinterestLogo} className="footer-socials" alt="pinterest"/></a>
                    </div>
                </section>
                <section className="footer-navbar">
                    <div className="footer-navbar-inner">
                        <div className="footer-navlink"><StyledNavLink to="/">Home</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/economics">Economics</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/finance">Finance</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/medicine">Medicine</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/moneywise">Money-Wise</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/tech">Tech</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/newsletters">Newsletters</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/subscribe">Subscribe</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/give-a-gift">Give a Gift</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/store">Shop the REACH Store</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/careers">Careers</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="press-rooms">Press Room</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/editors">Contact the Editors</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/customer-service">Customer Service</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/reprints-and-permissions">Reprints and Permissions</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/privacy-policy">Privacy Policy</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/your-privacy-rights">Your Privacy Rights</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/terms-of-use">Terms of Use</StyledNavLink></div>
                        <div className="footer-navlink"><StyledNavLink to="/site-map">Site Map</StyledNavLink></div>
                    </div>
                </section>
                <section className="footer-terms-bar">
                    <p className="footer-terms">
                    © 2021 REACH USA, LLC. All Rights Reserved. Use of this site constitutes acceptance of our Terms of Use, Privacy Policy (Your California Privacy Rights) and Do Not Sell My Personal Information.
REACH may receive compensation for some links to products and services on this website. Offers may be subject to change without notice.
This site is protected by reCAPTCHA and the Google Privacy Policy Terms of Service apply.
                    </p>
                </section>
            </section>
        );
    }
}

export default Footer;