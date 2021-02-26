import React from "react";
import SectionHeader from "./SectionHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoginCarousel from "./LoginCarousel";
import loginBackground from "./assets/login-background-2.jpg";
import axios from "axios";
import { withRouter } from "react-router-dom"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerBtnState: false,
            user_username: "",
            user_password: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.logon = this.logon.bind(this);
    } 

    handleClick(evt) {
        evt.preventDefault();
        if (this.state.hamburgerBtnState) {
            this.setState({
                hamburgerBtnState: false
            });
            evt.currentTarget.classList.remove("open");
        } else {
            this.setState({
                hamburgerBtnState: true
            });
            evt.currentTarget.classList.add("open");
        }
    }

    handleChange(evt) {
        switch (evt.target.className) {
            case "login-form-username-input":
                this.setState({ user_username: evt.target.value });
                break;
            case "login-form-password-input":
                this.setState({ user_password: evt.target.value });
                break;  
            default: 
                console.log("handleChange function in Login.js resulted in default case.");
                break;

        }
    }

    logon(evt) {
        evt.preventDefault();
        axios.defaults.withCredentials = true;
        const logonDetails = {
            user_username: this.state.user_username,
            user_password: this.state.user_password
        };
        axios.post("/logging-on", logonDetails, {withCredentials:true})
            .then(res => {
                console.log("Successfully sent user logon details to server.");
                if (res.data.msg === "Logged In Successfully") {
                    this.props.history.push({
                        pathname:'/'
                    });
                } else {
                    window.location.reload();
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    render() {
        return (
            <section className="section login-wrapper">
                <SectionHeader function={this.handleClick}/>
                <Navbar burgerState={this.state}/>
                <div className="main-box">
                    <div className="login-carousel-box">
                        <LoginCarousel className="login-carousel"/>
                    </div>
                    <div className="login-background-img-box">
                        <img className="login-background-img" src={loginBackground} alt="rocket launching"/>
                    </div>
                    <div className="login-body-box">
                        <div className="login-body-inner-box">
                            <div className="login-form-heading-box">
                                <h1 className="login-form-heading">LOG INTO YOUR ACCOUNT</h1>
                            </div>
                            <div className="login-form-box">
                                <input className="login-form-username-input" type="text" placeholder="username" onChange={this.handleChange} value={this.state.user_username}/>
                                <input className="login-form-password-input" type="password" placeholder="password" onChange={this.handleChange} value={this.state.user_password}/>
                            </div>
                            <button className="login-form-btn" onClick={this.logon}>SIGN IN</button>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        );
    }
}

export default withRouter(Login);
