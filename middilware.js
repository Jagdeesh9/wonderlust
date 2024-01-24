const Listing =require('./models/listing');
const Review =require('./models/review');
 
module.exports.isLoggedIn=(req,res,next)=>{
    console.log(req.path,".....", req.originalUrl)
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","please loging before creating a listng");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) =>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl
    }
    next();
}

module.exports.isOwner= async (req,res,next) =>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing.owner.equals(res.locals.currentUser._id)){
        req.flash("error", "you have not permission to update");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor= async (req,res,next) =>{
    const {id,reviewId} = req.params;
    const review = await Review.findById(reviewId);
    console.log(review);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error", "you have not permission to update");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

