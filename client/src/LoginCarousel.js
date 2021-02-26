import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class LoginCarousel extends React.Component {
    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 4000,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            className: "login-carousel",
            autoplay: true,
            autoPlaySpeed: 4000,
            fade: true
        };
        return (
            <Slider {...settings}>
                <div>
                    <h1 className="carousel-slide-heading">
                        Preparing for the Obstacles of Tomorrow
                    </h1>
                    <p className="carousel-slide-quote">
                        "REACH is the ultimate source of my education for disrupting today's industry into tomorrow."
                    </p>
                    <p className="carousel-quote-reference">
                        - Phillip La, CEO of Infinity Intelligence
                    </p>
                </div>
                <div>
                    <h1 className="carousel-slide-heading">
                        Exclusive Knowledge Finally Disclosed to the Public
                    </h1>
                    <p className="carousel-slide-quote">
                        "All the know-hows and more that I learned in my career and education at Stanford GSB is now in the hands of the common person."
                    </p>
                    <p className="carousel-quote-reference">
                        - Joseph Park, CTO of Park Robotics
                    </p>
                </div>
                <div>
                    <h1 className="carousel-slide-heading">
                        Premium Magazine for the Modern Professional
                    </h1>
                    <p className="carousel-slide-quote">
                        "REACH has become an essential amongst forward-thinking professionals of today. Its accurate predictions of today and tomorrow is the modern equivalent of a fortune teller."
                    </p>
                    <p className="carousel-quote-reference">
                        - Tomorrow Magazine
                    </p>
                </div>
            </Slider>
        );
    }
}