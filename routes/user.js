const express = require("express")
const router = express.Router({mergeParams:true});
const User = require('../models/user')
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { route } = require("./listing");
const { saveRedirectUrl } = require("../middilware");
const {renderSingUpForm,createUser,renderLoginForm,login,logOut} = require("../controllers/users")

router
.route("/singup")
.get(renderSingUpForm)
.post(wrapAsync(createUser))

router
.route("/login")
.get(renderLoginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login',
        failureFlash:true
    }),
    // User.authenticate() is a method provided by passport-local-mongoose 
    // that checks if the provided username and password match a user in the database.
    login
)


router.post(
    "/login",saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login',
        failureFlash:true
    }),
    // User.authenticate() is a method provided by passport-local-mongoose 
    // that checks if the provided username and password match a user in the database.
    login
)

router.get("/logout",logOut)

module.exports = router;