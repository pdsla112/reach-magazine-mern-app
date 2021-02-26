import React from "react";
import {NavLink} from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(NavLink)`
    color: #cf1b1b;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #fff;
    }
`;

class LogoBar extends React.Component {
    render() {
        return ( 
            <div className="logo-bar-wrapper">
                <div className="logo-bar-newsletter">
                    <StyledLink to="/newsletter" className="newspaper-link">Sign Up for Newsletters</StyledLink>
                </div>
                <h1 className="logo-bar-logo">REACH</h1>
                <div className="logo-bar-subscribe">
                    <button className="logo-bar-subscribe-btn">SUBSCRIBE</button>
                </div>
            </div>
        );
    }
}

export default LogoBar;