import axios from "axios";
import React from "react";
import { withRouter } from "react-router-dom";

class Catalog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            latest_article: []
        };
        this.displayCards = this.displayCards.bind(this);
        this.redirectArticle = this.redirectArticle.bind(this);
    }

    componentDidMount() {
        this.displayCards();
    }

    displayCards() {
        const section = this.props.section;
        axios.get('http://localhost:4000/section/' + section)
            .then(res => {
                console.log("This is res.data:");
                console.log(res.data);
                let array = Object.entries(res.data);
                let latestArticle = array.shift()[1];
                console.log(latestArticle);
                /* TODO: Make an Object.entries alternative for IE */
                this.setState({
                    articles: Array.from(array),
                    latest_article: latestArticle
                });
                console.log(this.state.latest_article);
                console.log(this.state.articles);
            })
            .catch(err => {
                console.log(err);
            });
    }

    redirectArticle(evt, article_id) {
        evt.preventDefault();
        console.log(this.state.latest_article.article_section);
        console.log(article_id);
        this.props.history.push({
            pathname: `/${this.state.latest_article.article_section}/individual-articles/${article_id}`,
            state: {
                article_id: article_id,
                article_section: this.state.latest_article.article_section
            }
        });
    }

    render() {
        return (
            <div className="catalog">
                <div className="latest-article" onClick={evt => {this.redirectArticle(evt, this.state.latest_article.article_id)}}>
                    <img src={`/images/${this.state.latest_article.article_image}`} alt="random-section-latest" className="latest-article-img" title={`click to view the latest article in the ${this.props.section.toLowerCase()} section...`}/>
                    <div className="latest-article-caption">
                        <h1 className="latest-article-caption-heading" title={`click to view the latest article in the ${this.props.section.toLowerCase()} section...`}>{this.state.latest_article.article_title}</h1>
                        <p className="latest-article-caption-txt" title={`click to view the latest article in the ${this.props.section.toLowerCase()} section...`}>{this.state.latest_article.article_summary}</p>
                    </div>
                </div>
                <div className="subarticles">
                    {
                        this.state.articles.map((elem, i) => 
                            <div className="subarticle" key={i} onClick={evt => {this.redirectArticle(evt, elem[1].article_id)}}>
                                <div className="subarticle-img-box">
                                    <img src={`/images/${elem[1].article_image}`} alt="random-section-latest" className="subarticle-img" title={`click to view this particular ${this.props.section.toLowerCase()} article...`}/>
                                </div>
                                <div className="subarticle-caption">
                                    <h1 className="subarticle-caption-heading" title={`click to view this particular ${this.props.section.toLowerCase()} article...`}>{elem[1].article_title}</h1>
                                    <p className="subarticle-caption-txt" title={`click to view this particular ${this.props.section.toLowerCase()} article...`}>{elem[1].article_summary}</p>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(Catalog);