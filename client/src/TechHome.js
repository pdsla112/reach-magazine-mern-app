import React from "react";
import { withRouter } from "react-router-dom";
import HomeSection from "./HomeSection";

class TechHome extends React.Component {

    render() {
        return(
            <HomeSection section="tech"/>
        );
    }
}

export default withRouter(TechHome);