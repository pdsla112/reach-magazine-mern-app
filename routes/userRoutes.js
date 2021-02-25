const express = require('express');
const user_controller = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/signup")
    .post(user_controller.user_signup_post);

userRouter.route("/logging-on")
    .post(user_controller.user_logon_post);

userRouter.route("/logging-out")
    .delete(user_controller.user_logout_delete);

userRouter.route("/authchecker")
    .get(user_controller.user_authchecker_get);

module.exports = userRouter;