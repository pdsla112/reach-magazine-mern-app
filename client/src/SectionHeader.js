import React from "react";
import HamburgerIcon from "./HamburgerIcon";
import axios from "axios";

export default class SectionHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logState: "",
            user_type: "",
            user_username: ""
        };
        this.getUserDetails = this.getUserDetails.bind(this);
    }

    componentDidMount() {
        this.getUserDetails();
    }

    getUserDetails() {
        axios.get("http://localhost:4000/authchecker", {withCredentials:true})
            .then(res => {
                console.log(res.data);
                if (res.data.msg === "Admin Authenticated Successfully") {
                    this.setState({
                        logState: true,
                        user_type: "admin",
                        user_username: res.data.sessUser.username
                    });
                } else if (res.data.msg === "Client Authenticated Successfully") {
                    this.setState({
                        logState: true,
                        user_type: "client",
                        user_username: res.data.sessUser.username
                    });
                } else {
                    this.setState({
                        logState: false,
                        user_type: "",
                        user_username: ""
                    });
                }
            })
            .catch(err => {
                console.log("Failed to send a get request to /authchecker...");
                console.log(err);
            });
    }

    render() {
        let userDetailClass = this.state.logState ? "section-header-user-profile" : "section-header-user-profile logged-off-navbar";
        return (
            <section className="section-header">
                <HamburgerIcon function={this.props.function} className="section-hamburger"/>
                <h1 className="section-header-logo">REACH</h1>
                <div className="section-header-user-profile-box">
                    <p className={userDetailClass}>Welcome, {this.state.user_username}!</p>
                </div>
                <button className="section-header-subscribe-btn">SUBSCRIBE</button>
            </section>
        );
    }
}