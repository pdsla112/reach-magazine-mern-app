import React from "react";
import SectionHeader from "./SectionHeader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";

export default class Publish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hamburgerBtnState: false,
            // article_number: 0,
            article_type: "Feature",
            article_section: "Urgent",
            article_title: "",
            article_summary: "",
            article_content: "",
            imagePreview: null,
            article_image: null,
            article_reference: "",
            image_buffer: null
        };
        this.handleClick = this.handleClick.bind(this);
        this.updateValues = this.updateValues.bind(this);
        this.addArticle = this.addArticle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
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

    addArticle(evt) {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('article_type', this.state.article_type);
        formData.append('article_section', this.state.article_section);
        formData.append('article_title', this.state.article_title);
        formData.append('article_summary', this.state.article_summary);
        formData.append('article_content', this.state.article_content);
        formData.append('article_image', this.state.article_image);
        formData.append('article_reference', this.state.article_reference);

        const config = {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
            }
        };

        console.log(formData);
        
        axios.post('http://localhost:4000/content-management-system/add', formData, config)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err);
            });

        this.setState({
            // article_number: 0,
            article_type: "Feature",
            article_section: "Urgent",
            article_title: "",
            article_summary: "",
            article_content: "",
            imagePreview: null,
            article_image: null,
            article_reference: ""
        });
    }

    updateValues(evt) {
        evt.preventDefault();
        switch (evt.target.className) {
            case "cms-form-content-selection":
                this.setState({ article_type: evt.target.value });
                break;
            case "cms-form-section-selection":
                this.setState({ article_section: evt.target.value });
                break;    
            case "cms-heading-txt-box":
                this.setState({ article_title: evt.target.value });
                break;
            case "cms-summary-txt-box":
                this.setState({ article_summary: evt.target.value });  
                break;
            case "cms-article-txt-box":
                this.setState({ article_content: evt.target.value });
                break;  
            case "cms-reference-txt-box":
                this.setState({ article_reference: evt.target.value });    
                break;      
            default:
                console.log("updateValues function in Publish.js has resulted in the default case.")
                break;  
        }
    }

    handleChange(evt) {
        evt.preventDefault();
        this.setState({
            article_image: evt.target.files[0],
            imagePreview: URL.createObjectURL(evt.target.files[0]),
        });
    }

    deleteImage(evt) {
        evt.preventDefault();
        this.setState({
            imagePreview: null,
            article_image: null
        });
    }

    render() {
        return (
            <section className="CMS-container section">
                <SectionHeader function={this.handleClick}/>
                <Navbar burgerState={this.state}/>

                <div className="cms-form-box">
                    <form encType="multipart/form-data" className="cms-form">
                        <div className="cms-form-top-section">
                            <h1 className="cms-heading">Add a New Article</h1>
                            <button className="cms-submit-btn" type="submit" onClick={this.addArticle}>SUBMIT ARTICLE</button>
                        </div>

                        <div className="cms-form-content-section">
                            <label className="cms-form-label cms-form-content-label">Content Type:</label>
                            <select className="cms-form-content-selection" type="text" name="article_type" value={this.state.article_type} onChange={this.updateValues}>
                                <option>Feature</option>
                                <option>Column</option>
                                <option>Sponsored Content</option>
                            </select>
                        </div>

                        <div className="cms-form-section-section">
                            <label className="cms-form-label cms-form-section-label">Section Type:</label>
                            <select className="cms-form-section-selection" type="text" name="article_section" value={this.state.article_section} onChange={this.updateValues}>
                                <option>Urgent</option>
                                <option>Economics</option>
                                <option>Finance</option>
                                <option>Medicine</option>
                                <option>Moneywise</option>
                                <option>Tech</option>
                            </select>
                        </div>

                        <div className="cms-form-heading-section">
                            <label className="cms-form-label cms-form-heading-label">Article Heading:</label>
                            <textarea className="cms-heading-txt-box" type="text" name="article_title" value={this.state.article_title} onChange={this.updateValues}></textarea>
                        </div>

                        <div className="cms-form-summary-section">
                            <label className="cms-form-label cms-form-summary-label">Article Summary:</label>
                            <textarea className="cms-summary-txt-box" type="text" name="article_summary" value={this.state.article_summary} onChange={this.updateValues}></textarea>
                        </div>

                        <div className="cms-form-image-section">
                            <label className="cms-form-label cms-form-image-label">Article Image:</label>
                            <input className="cms-image-input" type="file" accept=".png, .jpg, .jpeg" name="article_image" onChange={this.handleChange}/>
                            <div className="cms-image-preview-container">
                                <img src={this.state.imagePreview} className="cms-image-preview" onClick={this.deleteImage} alt="cms-preview"/>
                            </div>
                        </div>

                        <div className="cms-form-reference-section">
                            <label className="cms-form-label cms-form-reference-label">Article Image Reference:</label>
                            <textarea className="cms-reference-txt-box" type="text" name="article_reference" value={this.state.article_reference} onChange={this.updateValues}></textarea>
                        </div>

                        <div className="cms-form-article-section">
                            <label className="cms-form-label cms-form-article-label">Article Content:</label>
                            <textarea className="cms-article-txt-box" type="text" name="article_content" value={this.state.article_content} onChange={this.updateValues}></textarea>
                        </div>
                    </form>
                </div>

                <Footer />
            </section>
        );
    } 
}



// value={this.state.article_type} onChange={this.updateValues}