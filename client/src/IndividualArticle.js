import React from "react";
import SectionHeader from "./SectionHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { withRouter } from "react-router-dom";

class IndividualArticle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerBtnState: false,
            article_id: this.props.location.state.article_id,
            article_section: this.props.location.state.article_section,
            article_title: "",
            article_image: "",
            article_reference: "",
            article_content: ""
        };
        this.handleClick = this.handleClick.bind(this);
        this.renderArticle = this.renderArticle.bind(this);
    } 

    componentDidMount() {
        this.renderArticle();
    }

    renderArticle() {
        axios.get(`http://localhost:4000/individual-articles/${this.state.article_id}`)
            .then(res => {
                const article = res.data;
                this.setState({
                    article_title: article.article_title,
                    article_image: article.article_image,
                    article_reference: article.article_reference,
                    article_content: article.article_content
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    handleClick(evt) {
        evt.preventDefault();
        if (this.state.hamburgerBtnState) {
            this.setState({
                hamburgerBtnState: false
            });
            evt.currentTarget.classList.remove("open");
        } else {
            this.setState({
                hamburgerBtnState: true
            });
            evt.currentTarget.classList.add("open");
        }
    }
    
    render() {
        return (
            <section className="section">
                <SectionHeader function={this.handleClick}/>
                <Navbar burgerState={this.state}/>
                <div className="individual-article-box">
                    <div className="individual-article-title-box">
                        <h1 className="individual-article-title">
                            {this.state.article_title}
                        </h1>
                    </div>
                    <div className="individual-article-image-box">
                        <img src={`/images/${this.state.article_image}`} className="individual-article-image" alt="individual-article"/>
                    </div>
                    <div className="individual-article-reference-box">
                        <p className="individual-article-reference">
                            {this.state.article_reference}
                        </p>
                    </div>
                    <div className="individual-article-content-box">
                        <p className="individual-article-content">
                            {this.state.article_content}
                        </p>
                    </div>
                    <div className="individual-article-arrow-box">
                    </div>
                </div>
                <Footer />
            </section>
        );
    }
}

export default withRouter(IndividualArticle);
