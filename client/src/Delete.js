import React from "react";
import SectionHeader from "./SectionHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

export default class Delete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerBtnState: false,
            articles: [],
            sorter: "Urgent"
        };
        this.handleClick = this.handleClick.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateArticles = this.updateArticles.bind(this);
        this.sort = this.sort.bind(this);
    } 

    updateArticles(section) {
        axios.get('/content-management-system/delete/section/' + section.toLowerCase())
            .then(res => {
                console.log("This is res.data:");
                console.log(res.data);
                let array = Object.entries(res.data);
                /* TODO: Make an Object.entries alternative for IE */
                this.setState({
                    articles: Array.from(array)
                });
                console.log(this.state.articles);
            })
            .catch(err => console.log(err));
    }

    deleteArticle(evt, id) {
        evt.preventDefault();
        console.log("Delete this: " + id);
        axios.delete(`/content-management-system/delete/${id}`)
            .then(res => {
                console.log(res.data);
                this.updateArticles(this.state.sorter);
            })    
            .catch(err => {
                console.log(err);
            });
    }

    handleClick(evt) {
        // evt.preventDefault();
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

    handleChange(evt) {
        evt.preventDefault();
        this.setState({ sorter: evt.target.value });
        // this.updateArticles(this.state.sorter);
    }

    sort(evt) {
        this.updateArticles(this.state.sorter);
    }

    render() {
        return (
            <section className="CMS-container section">
                <SectionHeader function={this.handleClick}/>
                <Navbar burgerState={this.state}/>
                <div className="delete-form-section-sorter">
                    <select className="delete-form-section-sorter-dropdown" onChange={this.handleChange} value={this.state.sorter}>
                        <option>Urgent</option>
                        <option>Economics</option>
                        <option>Finance</option>
                        <option>Medicine</option>
                        <option>Moneywise</option>
                        <option>Tech</option>
                    </select>
                    <button className="cms-sort-btn" onClick={this.sort}>SORT BY SECTION</button>
                </div>
                <div className="cms-delete-form">
                        {
                            this.state.articles.map((elem, i) => 
                                <div className="cms-delete-form-data" key={i} value={elem}>
                                    <div className="cms-delete-form-data-specific">
                                        <div className="cms-delete-form-data-specific-type-label">
                                            ARTICLE TYPE
                                        </div>
                                        <div className="cms-delete-form-data-specific-type">
                                            {elem[1].article_type}
                                        </div>
                                        <div className="cms-delete-form-data-specific-date-label">
                                            ARTICLE PUBLISH DATE AND TIME
                                        </div>
                                        <div className="cms-delete-form-data-specific-date">
                                            {elem[1].article_date}
                                        </div>
                                        <div className="cms-delete-form-data-specific-section-label">
                                            ARTICLE SECTION TYPE
                                        </div>
                                        <div className="cms-delete-form-data-specific-section">
                                            {elem[1].article_section}
                                        </div>
                                        <div className="cms-delete-form-data-specific-title-label">
                                            ARTICLE TITLE
                                        </div>
                                        <div className="cms-delete-form-data-specific-title">
                                            {elem[1].article_title}
                                        </div> 
                                        <div className="cms-delete-form-data-specific-summary-label">
                                            ARTICLE SUMMARY
                                        </div>
                                        <div className="cms-delete-form-data-specific-summary">
                                            {elem[1].article_summary}
                                        </div>
                                        <div className="cms-delete-form-data-specific-image-label">
                                            ARTICLE IMAGE
                                        </div>
                                        <div className="cms-delete-form-data-specific-image">
                                            <img src={`/images/${elem[1].article_image}`} className="cms-delete-form-data-specific-image-image" alt="cms-random-article"/>
                                        </div>
                                        <div className="cms-delete-form-data-specific-reference-label">
                                            ARTICLE IMAGE REFERENCE
                                        </div>
                                        <div className="cms-delete-form-data-specific-reference">
                                            {elem[1].article_reference}
                                        </div>
                                        <div className="cms-delete-form-data-specific-content-label">
                                            ARTICLE CONTENT
                                        </div>
                                        <div className="cms-delete-form-data-specific-content">
                                            {elem[1].article_content}
                                        </div>    
                                    </div>
                                    <div className="cms-delete-form-data-specific-btn-box">
                                        <button className="cms-delete-btn" onClick={(evt) => {this.deleteArticle(evt, elem[1]._id)}}>DELETE</button>
                                    </div>
                                </div>
                            )
                        }
                </div>
                <Footer />
            </section>
        );
    } 
}