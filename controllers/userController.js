const express = require("express");
const app = express();
app.disable('x-powered-by');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

let userSchema = require('../models/userModel.js');
const conn2 = mongoose.createConnection(process.env.MONGO_USER_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "userDB" });
const User = conn2.model("user", userSchema, "user");

exports.user_signup_post = (req, res) => {
    const saltRounds = 12;
    const plainTextPassword = req.body.user_password;

    const salt = bcrypt.genSalt(saltRounds);

    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(plainTextPassword, salt, function(err, hash) {
            if (err) {
                console.log(err);
                res.status(400).send("Could not hash the password...");
            } else {
                const newUser = new User({
                    user_type: "client",
                    user_join_date: Date.now(),
                    user_fname: req.body.user_fname,
                    user_lname: req.body.user_lname,
                    user_birthdate: req.body.user_birthdate,
                    user_username: req.body.user_username,
                    user_email: req.body.user_email,
                    user_password: hash,
                    user_email_subscription: req.body.user_email_subscription,
                    user_mobile: req.body.user_mobile
                });
    
                console.log(newUser);
    
                newUser
                    .save()
                    .then(() => {
                        res.status(200).json({'user': 'new user successfully saved in database'});
                    })
                    .catch(err => {
                        res.status(400).send("Could not save new user to the database. Presented with the following error: " + err);
                    });
            }
        });
    });
};

exports.user_logon_post = (req, res) => {
    const username = req.body.user_username;
    const passwordPlainText = req.body.user_password;

    User.findOne({user_username: username})
        .then(user => {
            const storedPassword = user.user_password;
            bcrypt.compare(passwordPlainText, storedPassword)
                .then(result => {
                    if (result) {
                        console.log("The password inputted by the user matched with the password stored in the database!");

                        const sessUser = {
                            id: user._id,
                            username: user.user_username,
                            email: user.user_email
                        };

                        req.session.user = sessUser;
                        req.session.save(err => {
                            console.log(err);
                            console.log("Logged on successfully: ");
                            console.log(sessUser);
                            console.log(req.session);
                            res.json({ msg: "Logged In Successfully", sessUser });
                        });
                    } else {
                        console.log("The password inputted by the user is incorrect!");
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.send("Failed to compare the hash to the text password inputted by the client.");
                });
        })
        .catch(err => {
            console.log("Unable to find user...")
            console.log(err);
            res.send("Failed to find a user with such username in the database...");
        });
}

exports.user_logout_delete = (req, res) => {
    if (!req.session.user) {
        console.log("User is not already logged into an account to be able to logout...");
        res.send("User is not already logged into an account to be able to logout...");
    } else {
        req.session.destroy(err => {
            if (err) throw err;
            res.clearCookie("reachSession");
            console.log("User has successfully logged out of their REACH account...");
            res.send("User has successfully logged out of their REACH account...")
        })
    }    
};

exports.user_authchecker_get = (req, res) => {
    const sessUser = req.session.user;
    if (sessUser) {
        User.findOne({_id: sessUser.id})
            .then(user => {
                if (user.user_type === "client") {
                    return res.json({ msg: "Client Authenticated Successfully", sessUser });
                } else {
                    return res.json({ msg: "Admin Authenticated Successfully", sessUser });
                }
            })
            .catch(err => {
                res.send("Could not find then user with those session details in the user database...");
            });
    } else {
        return res.json({ msg: "Unauthorized" });
    }
};