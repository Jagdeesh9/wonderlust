const Listing = require("../models/listing")

module.exports.index =async(req,res)=>{
    let allListing = await Listing.find({});
    res.render('listings/index',{allListing})
}

module.exports.renderNewForm = (req,res)=>{
    res.render('listings/form.ejs')
}

module.exports.showListing = async (req,res)=>{
    // console.log("hello")
    const {id} = req.params;
    const listing =await Listing.findById(id)
    .populate({path:"reviews",
        populate:{
            path:"author",
        }})
        .populate("owner");

    if(!listing){
        req.flash("error","Listing You Requested For Doesn't Exist");
        res.redirect('/listings')
    }
    // console.log(listing);
    res.render('listings/show.ejs',{listing})
}

module.exports.createListing = async (req,res)=>{
    req.flash("success","new listing created!")
    let url = req.file.path;
    let filename = req.file.filename;
    console.log(url,".....",filename)
    const {title, description, price, location, country}=req.body;
    const newListing = await Listing.create({
        title,
        description,
        price,
        image:{filename,url},
        location,
        country,
        owner:req.user._id,
    })
    
    
    console.log(newListing);
    let allListing = await Listing.find({});
    res.redirect('/listings',200,{allListing})
}

module.exports.renderEditForm = async (req,res)=>{
    const {id} = req.params;
    const listing =await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing You Requested For Doesn't Exist");
        res.redirect('/listings')
    }
    res.render('listings/edit.ejs',{listing})
}

module.exports.updateListing = async(req,res)=>{
    const {id} = req.params;
    console.log(req.body.listing)
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    
    if(typeof req.file != 'undefined'){
        let url = req.file.path;
        let filename = req.file.filename;
    
        listing.image = {url,filename};

        await listing.save();
    }
    res.redirect(`/listings/${id}`);
}

module.exports.destroyListing = async(req,res)=>{
    const {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success","deleted Successfully!")
    res.redirect("/listings");
}