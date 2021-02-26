import React from "react";
import { withRouter } from "react-router-dom";
import HomeSection from "./HomeSection";

class MedicineHome extends React.Component {
    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <HomeSection section="medicine"/>
        );
    }
}

export default withRouter(MedicineHome);