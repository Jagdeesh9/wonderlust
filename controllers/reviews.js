const Review = require("../models/review")
const Listing = require("../models/listing")
module.exports.createReview = async (req, res) => {
    console.log(req.params)
    try {    
        req.flash("success","review created succesfully!");

        // Find the listing by ID
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).send("Listing not found");
        }

        // Create a new review instance using the review data from the request body
        let newReview = new Review(req.body.review);

        newReview.author = req.user._id; 
        // Add the new review to the "reviews" array of the listing
        listing.reviews.push(newReview);

        // Save both the listing and the new review
        await listing.save();
        await newReview.save();

        res.redirect(`/listings/${req.params.id}`);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports.deleteReview = async(req,res)=>{
    req.flash("success","deleted successfully!");
    let {id,reviewId} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}