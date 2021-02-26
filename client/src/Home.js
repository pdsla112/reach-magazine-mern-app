import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";
import Urgent from "./Urgent";
import EconomicsHome from "./EconomicsHome";
import FinanceHome from "./FinanceHome";
import MedicineHome from "./MedicineHome";
import MoneyWiseHome from "./MoneyWiseHome";
import TechHome from "./TechHome";
import Footer from "./Footer";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerBtnState: false
        };
        this.handleClick = this.handleClick.bind(this);
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

    render() {
        return (
            <div className="home-wrapper" id="home-wrapper-mobile">
                <Header className="header" function={this.handleClick}/>
                <Navbar className="navbar" burgerState={this.state}/>
                <Urgent className="urgent"/>
                <EconomicsHome className="economics-home"/>
                <FinanceHome className="finance-home"/>
                <MedicineHome className="medicine-home"/>
                <MoneyWiseHome className="moneywise-home"/>
                <TechHome className="tech-home"/>
                <Footer className="footer"/>
            </div>
        );
    }
}

export default Home;