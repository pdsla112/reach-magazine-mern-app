import React from "react";
import { withRouter } from "react-router-dom";
import HomeSection from "./HomeSection";

class EconomicsHome extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this._isMounted = true;
    }
    
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <HomeSection section="economics"/>
        );
    }
}

export default withRouter(EconomicsHome);