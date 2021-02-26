const express = require('express');
const app = express();

const mongoose = require("mongoose");
let articleSchema = require('../models/articleModel.js');
const conn = mongoose.createConnection(process.env.MONGO_ARTICLE_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "articleDB" });
const Article = conn.model("article", articleSchema, "article");

const fs = require("fs");
const path = require("path");

// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true 
// }));

// app.use(cors({
//     origin: 'https://dry-cove-41912.herokuapp.com',
//     credentials: true 
// }));

app.use('/images', express.static(path.join(__dirname, '/images')));

exports.article_publish_post = (req, res) => {
    console.log("START FROM HERE");
    const article = new Article({
        article_type: req.body.article_type,
        article_date: Date.now(),
        article_section: req.body.article_section,
        article_title: req.body.article_title,
        article_summary: req.body.article_summary,
        article_content: req.body.article_content,
        article_image: req.file.filename,
        article_reference: req.body.article_reference
    });
    console.log(mongoose.connection.readyState);
    article
        .save()
        .then(() => {
            console.log("Saved successfully!");
            res.status(200).json({'article': 'article saved successfully'});
        })
        .catch(err => {
            console.log("Article save unsuccessful!");
            res.status(400).send('adding new article failed');
        });
};

exports.article_delete_get = (req, res) => {
    const section = req.params.id.charAt(0).toUpperCase() + req.params.id.slice(1);
    console.log(section);
    if (section == "") {
        Article.find({}, (err, articles) => {
            let articleMap = {};
            articles.forEach((article) => {
                articleMap[article._id] = article;
            });
            res.send(articleMap);
        });
    } else {
        Article.find({article_section: section}, (err, articles) => {
            let articleMap = {};
            articles.forEach((article) => {
                articleMap[article._id] = article;
            });
            res.send(articleMap);
        });
    }
};

exports.article_cms_delete = (req, res) => {
    const id = req.params.id;

    Article.findById({_id: id}, (err, article) => {
        if (err) {
            console.log("Could not find an article of that id.")
        } else {
            const pathway = path.join(__dirname,'../../../draft-app/public/images/') + article.article_image;
            fs.unlink(pathway, () => {
            console.log("Deleting image file saved in Multer disk storage...");
        });
        }
    });

    Article.findOneAndDelete({_id: id}, () => {})
        .then(
            res.status(200).send({'article': 'article deleted successfully'})
        )
        .catch(err => {
            res.status(400).send('deleting article failed');
        });
};

exports.article_section_display_get = (req, res) => {
    const id = req.params.id;
    const firstLetter = id.charAt(0).toUpperCase();
    const restOfWord = id.substring(1, id.length);
    const fullWord = firstLetter + restOfWord;
    console.log(fullWord);
    Article.find({article_section: id}).sort({article_date: -1}).exec((err, articles) => {
        let articleMap = {};
        if (err) {
            res.status(400).send("Error when getting sorted home articles...")
        } else {
            articles.forEach((article) => {
                const articleDetails = {
                    article_id: article._id,
                    article_section: article.article_section,
                    article_title: article.article_title,
                    article_summary: article.article_summary,
                    article_image: article.article_image
                };
                articleMap[article._id] = articleDetails;
            });
            console.log(articleMap);
            res.send(articleMap);
        }
    });
}

exports.article_home_section_display_get = async (req, res) => {
    const id = req.params.id;
    const firstLetter = id.charAt(0).toUpperCase();
    const restOfWord = id.substring(1, id.length);
    const fullWord = firstLetter + restOfWord;
    const articles = await Article.find({article_section: fullWord}).sort({article_date: -1}).limit(3);
    try {
        res.send(articles);
    } catch (err) {
        console.log(err);
    }
};

exports.article_individual_display_get = (req, res) => {
    const articleId = req.params.id;
    Article.findOne({_id: articleId})
        .then(article => {
            res.send(article);
        })
        .catch(err => {
            console.log(err);
        });
};