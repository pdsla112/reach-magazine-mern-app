import React from "react";
import SectionHeader from "./SectionHeader";
import Navbar from "./Navbar";
import Catalog from "./Catalog";
import Footer from "./Footer";

class Economics extends React.Component {
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
            <section className="economics-wrapper section">
                <SectionHeader function={this.handleClick}/>
                <Navbar burgerState={this.state}/>
                <Catalog section="Economics"/>
                <Footer />
            </section>
        );
    }
}

export default Economics;