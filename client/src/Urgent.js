import React from "react";
import urgent from "./assets/urgent.jpg";
import urgentColumn1 from "./assets/urgent-column1.jpg";
import urgentColumn2 from "./assets/urgent-column2.jpg";
import arrow from "./assets/right-arrow.svg";

class Urgent extends React.Component {

    render() {
        return (
            <section className="urgent-wrapper" id="urgent-mobile-wrapper">
                <div className="home-heading"><h1>TOP STORIES</h1></div>
                <div className="home-content-box">
                <div className="home-feature">
                    <div className="home-feature-img">
                        <img src={urgent} alt="trump-vote-appeal" className="home-img"/>
                    </div>
                    <div className="home-feature-caption">
                        <div className="home-feature-caption-subheading"><h1 className="home-feature-subheading">LATEST FEATURE</h1></div>
                        <div className="home-feature-caption-title"><h3 className="home-feature-title feature-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis orci nisl, quis aliquet ante accumsan eu.</h3></div>
                        <p className="home-feature-caption-text feature-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis orci nisl, quis aliquet ante accumsan eu. Donec vel bibendum odio, iaculis consectetur augue.
                        </p>
                        <div className="home-feature-caption-arrow"><img src={arrow} className="home-arrow" alt="arrow"/></div>
                    </div>
                </div>

                <div className="home-columns">
                    <div className="home-column-1">
                        <div className="home-column-1-img">
                            <img src={urgentColumn1} alt="capitol building" className="home-img"/>
                        </div>
                        <div className="home-column-1-caption">
                            <h1 className="home-column-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis orci nisl, quis aliquet ante accumsan eu.</h1>
                            <p className="home-column-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis orci nisl, quis aliquet ante accumsan eu. Donec vel bibendum odio, iaculis consectetur augue.</p>
                        </div>
                    </div>
                    <div className="home-column-2">
                        <div className="home-column-2-img">
                            <img src={urgentColumn2} alt="BLM protest" className="home-img"/>
                        </div>
                        <div className="home-column-2-caption">
                            <h1 className="home-column-heading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis orci nisl, quis aliquet ante accumsan eu.</h1>
                            <p className="home-column-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis orci nisl, quis aliquet ante accumsan eu. Donec vel bibendum odio, iaculis consectetur augue.</p>
                        </div>
                    </div>
                </div>
                </div>
            </section>
        );
    }
}

export default Urgent;