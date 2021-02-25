const express = require("express");
const app = express();
const cors = require("cors");
const article_controller = require("../controllers/articleController");
const articleRouter = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname,'../draft-app/public/images'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

articleRouter.route("/content-management-system/add")
    .post(upload.single("article_image"), article_controller.article_publish_post);

articleRouter.route("/content-management-system/delete/section/:id")
    .get(article_controller.article_delete_get);

articleRouter.route("/content-management-system/delete/:id")
    .delete(article_controller.article_cms_delete);

articleRouter.route('/section/:id')
    .get(article_controller.article_section_display_get);

articleRouter.route("/home/:id")
    .get(article_controller.article_home_section_display_get);

articleRouter.route("/individual-articles/:id")
    .get(article_controller.article_individual_display_get);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));
    
app.use('/images', express.static(path.join(__dirname, '/images')));

module.exports = articleRouter;