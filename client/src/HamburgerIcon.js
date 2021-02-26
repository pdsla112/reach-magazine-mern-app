import React from "react";

class HamburgerIcon extends React.Component {
    render() {
        return (
            <div className="hamburger-btn-box" onClick={this.props.function}>
                <div className="hamburger-btn"></div>
            </div>
        );
    }
}

export default HamburgerIcon;