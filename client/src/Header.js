import React from "react";
import HamburgerIcon from "./HamburgerIcon";
import SubscriptionAd from "./SubscriptionAd";
import LogoBar from "./LogoBar";
import ImportantBar from "./ImportantBar";

class Header extends React.Component {
    render() {
        return ( 
            <div className="header-wrapper sticky-header">
                <SubscriptionAd/>
                <LogoBar/>
                <ImportantBar logState={this.props.logState}/>
                <HamburgerIcon function={this.props.function}/>
            </div>
        );
    }
}

export default Header;
