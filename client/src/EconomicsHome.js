import React from "react";
import {withRouter} from "react-router-dom";
import HomeSection from "./HomeSection";

class EconomicsHome extends React.Component {
    render() {
        return(
            <HomeSection section="economics"/>
        );
    }
}

export default withRouter(EconomicsHome);