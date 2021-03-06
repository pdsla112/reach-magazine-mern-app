import React from "react";
import { withRouter } from "react-router-dom";
import HomeSection from "./HomeSection";

class TechHome extends React.Component {
    _isMounted = false;

    async componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return(
            <HomeSection section="tech"/>
        );
    }
}

export default withRouter(TechHome);