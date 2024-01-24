const express = require("express")
const router = express.Router({mergeParams:true});
const Listing = require('../models/listing');
const wrapAsync = require("../utils/wrapAsync");
const expressError = require("../utils/expressError");
const Review = require("../models/review.js");
const {isLoggedIn,isReviewAuthor} = require("../middilware.js")
const {createReview,deleteReview} = require("../controllers/reviews.js")


router.post("/",isLoggedIn,wrapAsync(createReview));

router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(deleteReview))

module.exports = router