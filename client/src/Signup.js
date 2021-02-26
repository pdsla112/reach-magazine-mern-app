import React from "react";
import SectionHeader from "./SectionHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { withRouter } from "react-router-dom";

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerBtnState: false,
            fName: "",
            lName: "",
            day: "",
            month: "",
            year: "",
            mobileNum: "",
            username: "",
            email: "",
            password: "",
            subscription: "true"
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubscription = this.handleSubscription.bind(this);
        this.convertToNumMonth = this.convertToNumMonth.bind(this);
        this.submitUser = this.submitUser.bind(this);
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
        evt.preventDefault();
        const inputLocation = evt.target.className;
        switch (inputLocation) {
            case "signup-form-fname-input":
                this.setState({ fName: evt.target.value });
                break;
            case "signup-form-lname-input":
                this.setState({ lName: evt.target.value });
                break;
            case "signup-form-birthdate-input-month":
                this.setState({ month: evt.target.value });
                break;
            case "signup-form-birthdate-input-day":
                this.setState({ day: evt.target.value });
                break;
            case "signup-form-birthdate-input-year":
                this.setState({ year: evt.target.value });
                break;
            case "signup-form-mobile-input":
                this.setState({ mobileNum: evt.target.value });
                break;
            case "signup-form-username-input":
                this.setState({ username: evt.target.value });
                break;
            case "signup-form-email-input":
                this.setState({ email: evt.target.value });
                break;
            case "signup-form-password-input":
                this.setState({ password: evt.target.value });
                break;      
            default:
                console.log("handleChange function in Signup.js resulted in the default case.");
                break;                                 
        }
    }

    handleSubscription(evt) {
        if (evt.target.value === true) {
            this.setState({ subscription: false });
        } else {
            this.setState({ subscription: true });
        }
    }

    convertToNumMonth(stringMonth) {
        switch (stringMonth) {
            case "January":
                return 1;
            case "February":
                return 2;
            case "March":
                return 3;
            case "April":
                return 4;
            case "May":
                return 5;
            case "June":
                return 6;
            case "July":
                return 7;
            case "August":
                return 8;
            case "September":
                return 9;
            case "October":
                return 10;
            case "November":
                return 11;
            case "December":
                return 12;
            default: 
                console.log("convertToNumMonth function in Signup.js resulted in the default case.");
                break;
        }
    }

    submitUser(evt) {
        evt.preventDefault();
        const birthdate = `${this.convertToNumMonth(this.state.month)}/${this.state.day}/${this.state.year}`;
        const user = {
            user_fname: this.state.fName,
            user_lname: this.state.lName,
            user_birthdate: birthdate,
            user_username: this.state.username,
            user_email: this.state.email,
            user_password: this.state.password,
            user_email_subscription: this.state.subscription,
            user_mobile: this.state.mobileNum
        }

        axios.post("http://localhost:4000/signup", user, {withCredentials:true})
            .then(() => {
                console.log("User data successfully sent to server for processing into new account...");
                const logonDetails = {
                    user_username: user.user_username,
                    user_password: user.user_password
                };
                axios.post("http://localhost:4000/logging-on", logonDetails, {withCredentials:true})
                    .then(() => {
                        console.log("Logging newly registered user into their account...");
                        this.props.history.push(`/`);
                    })
                    .catch(err => {
                        console.log("Could not log newly registered user into their personal account...");
                        this.props.history.push(`/`);
                    });
            })
            .catch(err => {
                console.log(err);
            });
        
        this.setState({
            fName: "",
            lName: "",
            day: "",
            month: "",
            year: "",
            mobileNum: "",
            username: "",
            email: "",
            password: "",
            subscription: "true"
        });
    }
    
    render() {
        return (
            <section className="section signup-wrapper">
                <SectionHeader function={this.handleClick}/>
                <Navbar burgerState={this.state}/>
                <div className="signup-body-box">
                <div className="signup-form-box">
                    <div className="signup-form-heading-box">
                        <h1>Sign up to a Brand New Account and Receive the Latest News</h1>
                    </div>

                    <label className="signup-form-fname-label">First Name</label>
                    <input className="signup-form-fname-input" value={this.state.fName} onChange={this.handleChange}/>

                    <label className="signup-form-lname-label">Last Name</label>
                    <input className="signup-form-lname-input" value={this.state.lName} onChange={this.handleChange}/>

                    <label className="signup-form-birthdate-label">Date of Birth</label>
                    <div className="signup-form-birthdate-input-box">
                        <select className="signup-form-birthdate-input-month" value={this.state.month} onChange={this.handleChange}>
                            <option>MONTH</option>
                            <option>January</option>
                            <option>February</option>
                            <option>March</option>
                            <option>April</option>
                            <option>May</option>
                            <option>June</option>
                            <option>July</option>
                            <option>August</option>
                            <option>September</option>
                            <option>October</option>
                            <option>November</option>
                            <option>December</option>
                        </select>
                        <select className="signup-form-birthdate-input-day" value={this.state.day} onChange={this.handleChange}>
                            <option>DAY</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>
                        <input className="signup-form-birthdate-input-year" placeholder="YEAR" value={this.state.year} onChange={this.handleChange}/>
                    </div>
                    
                    <label className="signup-form-mobile-label">Mobile Phone Number</label>
                    <input className="signup-form-mobile-input" type="tel" value={this.state.mobileNum} onChange={this.handleChange}/>

                    <label className="signup-form-username-label">Username</label>
                    <input className="signup-form-username-input" value={this.state.username} onChange={this.handleChange}/>

                    <label className="signup-form-email-label">Email Address</label>
                    <input className="signup-form-email-input" type="email" value={this.state.email} onChange={this.handleChange}/>

                    <label className="signup-form-password-label">Password</label>
                    <input className="signup-form-password-input" type="password" value={this.state.password} onChange={this.handleChange}/>
                    
                    <div className="signup-form-subscription-box">
                        <label className="signup-form-label">Subscribe to Newsletter Being Regularly Sent to My Email</label>
                        <input className="signup-form-subscription-input" type="checkbox" value={this.state.subscription} onChange={this.handleSubscription} defaultChecked={this.state.subscription}/>
                    </div>
                    <div className="signup-form-btn-box">
                        <button className="signup-form-btn" onClick={this.submitUser}>SIGN ME UP</button>
                    </div>
                </div>
                </div>
                <Footer />
            </section>
        );
    }
}

export default withRouter(Signup);