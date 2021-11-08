import React from "react";
import {withRouter} from "react-router-dom";
import HomeSection from "./HomeSection";

class MoneyWiseHome extends React.Component {

    render() {
        return(
            <HomeSection section="moneywise"/>
        );
    }
}

export default withRouter(MoneyWiseHome);