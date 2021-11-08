import React from "react";
import arrow from "./assets/right-arrow.svg";
import axios from "axios";
import withRouter from "react-router-dom";

class HomeSection extends React.Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            latestArticle: [],
            smallerArticles: [{}, {}],
            section: this.props.section
        }
        this.renderArticles = this.renderArticles.bind(this);
        this.redirectArticle = this.redirectArticle.bind(this);
        this.redirectToSection = this.redirectToSection.bind(this);
    }

    renderArticles() {
        axios.get(`/home/${this.state.section}`)
            .then(res => {
                const articles = res.data;
                const latestArticle = articles.shift();
                console.log(res);
                this.setState({
                    latestArticle: latestArticle,
                    smallerArticles: articles
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    redirectArticle(evt, article_id) {
        evt.preventDefault();
        this.props.history.push({
            pathname: `/${this.state.section}/individual-articles/${article_id}`,
            state: {
                article_id: article_id,
                article_section: this.state.section
            }
        });
    }

    redirectToSection() {
        this.props.history.push({
            pathname: `/${this.state.section}`
        });
    }

    render() {
        return(
            <section className={`${this.state.section}-home-wrapper`} id={`${this.state.section}-mobile-wrapper`}>
                <h1 className="home-heading" onClick={this.redirectToSection} title={`click to see all ${this.state.section} articles...`}>{this.state.section.toUpperCase()}</h1>
                <div className="home-content-box">
                <div className="home-feature">
                    <div className="home-feature-img" onClick={evt => {this.redirectArticle(evt, this.state.latestArticle._id)}}>
                        <img src={`/images/${this.state.latestArticle.article_image}`} alt={`${this.state.section} latest article`} className="home-img"/>
                    </div>
                    <div className="home-feature-caption">
                        <div className="home-feature-caption-subheading" onClick={evt => {this.redirectArticle(evt, this.state.latestArticle._id)}}><h1 className="home-feature-subheading">LATEST FEATURE</h1></div>
                        <div className="home-feature-caption-title" onClick={evt => {this.redirectArticle(evt, this.state.latestArticle._id)}}><h3 className="home-feature-title feature-title">{this.state.latestArticle.article_title}</h3></div>
                        <p className="home-feature-caption-text feature-text" onClick={evt => {this.redirectArticle(evt, this.state.latestArticle._id)}}>
                            {this.state.latestArticle.article_summary}
                        </p>
                        <div className="home-feature-caption-arrow" onClick={this.redirectToSection} title={`click to see all ${this.state.section} articles...`}><img src={arrow} className="home-arrow" alt="arrow"/></div>
                    </div>
                </div>
                <div className="home-columns">
                    <div className="home-column-1" onClick={evt => {this.redirectArticle(evt, this.state.smallerArticles[0]._id)}}>
                        <div className="home-column-1-img">
                            <img src={`/images/${this.state.smallerArticles[0].article_image}`} alt={`${this.state.section} second latest article`} className="home-img"/>
                        </div>
                        <div className="home-column-1-caption">
                            <h1 className="home-column-heading">{this.state.smallerArticles[0].article_title}</h1>
                            <p className="home-column-text">{this.state.smallerArticles[0].article_summary}</p>
                        </div>
                    </div>
                    <div className="home-column-2" onClick={evt => {this.redirectArticle(evt, this.state.smallerArticles[1]._id)}}>
                        <div className="home-column-2-img">
                            <img src={`/images/${this.state.smallerArticles[1].article_image}`} alt={`${this.state.section} third latest article`} className="home-img"/>
                        </div>
                        <div className="home-column-2-caption">
                            <h1 className="home-column-heading">{this.state.smallerArticles[1].article_title}</h1>
                            <p className="home-column-text">{this.state.smallerArticles[1].article_summary}</p>
                        </div>
                    </div>                    
                </div>
                </div>
            </section>
        );
    }
}

export default withRouter(HomeSection);