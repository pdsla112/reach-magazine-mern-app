import React from "react";
import withRouter from "react-router-dom";
import HomeSection from "./HomeSection";

class FinanceHome extends React.Component {

    render() {
        return(
            <HomeSection section="finance"/>
        );
    }
}

export default withRouter(FinanceHome);