import React from "react";
import {withRouter} from "react-router-dom";
import HomeSection from "./HomeSection";

class MedicineHome extends React.Component {

    render() {
        return(
            <HomeSection section="medicine"/>
        );
    }
}

export default withRouter(MedicineHome);