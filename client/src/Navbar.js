import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import styled from "styled-components";
import facebookLogo from "./assets/facebook-logo.svg";
import instagramLogo from "./assets/instagram-logo.svg";
import twitterLogo from "./assets/twitter-logo.svg";
import pinterestLogo from "./assets/pinterest-logo.svg";
import axios from "axios";

const StyledNavLink = styled(NavLink)`
    color: #282f2f;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        color: #cf1b1b;
    }
`;

const headingStyle = {
    color: "#282f2f",
    marginLeft: "1em"
};

const listStyle = {
    listStyle: "none",
    paddingLeft: 0,
    marginLeft: "1em"
};

const individualListStyle = {
    marginBottom: "1em"
}

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logState: "",
            logOutDisplay: "",
            user_type: ""
        };
        this.handleLogout = this.handleLogout.bind(this);
        this.getLogState = this.getLogState.bind(this);
        this.handleLogInOutDisplays = this.handleLogInOutDisplays.bind(this);
    }

    componentDidMount() {
        this.getLogState();
        this.handleLogInOutDisplays();
    }

    handleLogout(evt) {
        evt.preventDefault();
        axios.defaults.withCredentials = true;
        axios.delete("http://localhost:4000/logging-out", {withCredentials:true})
            .then(() => {
                this.setState({
                    logState: false,
                    logOutDisplay: false,
                    user_type: ""
                });
                console.log("User successfully logged out...");
                // this.props.history.push({
                //     pathname: `/`
                // });
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            });
    }

    getLogState() {
        axios.get("http://localhost:4000/authchecker", {withCredentials:true})
            .then(res => {
                console.log(res.data);
                if (res.data.msg === "Admin Authenticated Successfully") {
                    this.setState({
                        logState: true,
                        logOutDisplay: true,
                        user_type: "admin"
                    });
                } else if (res.data.msg === "Client Authenticated Successfully") {
                    this.setState({
                        logState: true,
                        logOutDisplay: true,
                        user_type: "client"
                    });
                } else {
                    this.setState({
                        logState: false,
                        logOutDisplay: false,
                        user_type: ""
                    });
                }
            })
            .catch(err => {
                console.log("Failed to send a get request to /authchecker...");
                console.log(err);
            });
    }

    handleLogInOutDisplays() {
        if (this.state.logState) {
            return "logged-on-navbar"
        }
    }

    render() {
        let navbarClass = this.props.burgerState.hamburgerBtnState ? "navbar-wrapper open-navbar" : "navbar-wrapper";
        let userTypeClass = (this.state.user_type === "admin") ? "logged-on-navbar" : "logged-off-navbar";
        let userLogInDisplay = this.state.logState ? "logged-off-navbar" : "logged-on-navbar";
        let userLogoutDisplay = this.state.logOutDisplay ? "logged-on-navbar" : "logged-off-navbar";
        return (
            <section className={navbarClass}>
                    <p style={headingStyle}>SECTIONS</p>
                    <ul style={listStyle}>
                        <li style={individualListStyle}><StyledNavLink to="/">Home</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/economics">Economics</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/finance">Finance</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/medicine">Medicine</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/moneywise">Money-Wise</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/tech">Tech</StyledNavLink></li>
                    </ul>
                    <hr />
                    <p style={headingStyle}>JOIN US</p>
                    <ul style={listStyle}>
                        <li style={individualListStyle}><StyledNavLink to="/newsletters">Newsletters</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/subscribe">Subscribe</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/give-a-gift">Give a Gift</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/store">Shop the REACH Store</StyledNavLink></li>
                    </ul>
                    <hr />
                    <p style={headingStyle}>REACH OUT</p>
                    <ul style={listStyle}>
                        <li style={individualListStyle}><StyledNavLink to="/careers">Careers</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="press-rooms">Press Room</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/editors">Contact the Editors</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/customer-service">Customer Service</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/reprints-and-permissions">Reprints and Permissions</StyledNavLink></li>
                    </ul>
                    <hr />
                    <p style={headingStyle}>MORE</p>
                    <ul style={listStyle}>
                        <li style={individualListStyle} className={userLogInDisplay}><StyledNavLink to="/sign-up-to-a-new-account">Sign Up</StyledNavLink></li>
                        <li style={individualListStyle} className={userLogInDisplay}><StyledNavLink to="/log-into-your-account">Login</StyledNavLink></li>
                        <li style={individualListStyle} className={userLogoutDisplay} onClick={this.handleLogout}><StyledNavLink to="/">Logout</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/privacy-policy">Privacy Policy</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/your-privacy-rights">Your Privacy Rights</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/terms-of-use">Terms of Use</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/site-map">Site Map</StyledNavLink></li>
                    </ul>
                    <hr />
                    <p style={headingStyle} className={userTypeClass}>CMS</p>
                    <ul style={listStyle} className={userTypeClass}>
                        <li style={individualListStyle}><StyledNavLink to="/content-management-system/contribute">Publish New Article</StyledNavLink></li>
                        <li style={individualListStyle}><StyledNavLink to="/content-management-system/delete-articles">Delete Articles</StyledNavLink></li>
                    </ul>
                    <hr className={userTypeClass}/>
                    <p style={headingStyle}>CONNECT WITH US</p>
                    <div className="navbar-social-wrapper">
                        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><img src={facebookLogo} className="navbar-social-logo" alt="facebook"/></a>
                        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><img src={instagramLogo} className="navbar-social-logo" alt="instagram"/></a>
                        <a href="https://twitter.com/?lang=en" target="_blank" rel="noopener noreferrer"><img src={twitterLogo} className="navbar-social-logo" alt="twitter"/></a>
                        <a href="https://www.pinterest.com.au/" target="_blank" rel="noopener noreferrer"><img src={pinterestLogo} className="navbar-social-logo" alt="pinterest"/></a>
                    </div>
            </section>
        );
    }
}

export default withRouter(Navbar);