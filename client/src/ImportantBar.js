import React from "react";
import NavLink from "react-router-dom";
import axios from "axios";

class ImportantBar extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
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
        axios.get("/authchecker", {withCredentials:true})
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
        let userProfileClass = this.state.logState ? "important-bar-user-profile" : "important-bar-user-profile logged-off-navbar";
        return ( 
            <div className="important-bar-wrapper">
                {/* <section className="important-bar-burger-btn"></section> */}
                <div className="important-bar-links">
                    <p className="important-links">GRAPHENE IS THE FUTURE</p>
                    <p className="important-links">ECO-FRIENDLY REVOLUTION</p>
                    <p className="important-links">WILL TIARA FACE CONSEQUENCES?</p>
                    <NavLink to="/newsletter" style={{...{textDecoration: "none"}, ...{color: "#dddddd"}, ...{marginTop: "auto"}, ...{marginBottom: "auto"}}}>NEWSLETTER</NavLink>
                </div>
                <div className="important-bar-search">
                    <p className={userProfileClass}>
                        Welcome, {this.state.user_username}!
                    </p>
                </div>
            </div>
        );
    }
}

export default ImportantBar;