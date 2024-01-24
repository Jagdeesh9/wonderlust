const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    image:{
        filename:{
            type:String,
        },
        url:{
            type:String,
        }
    },
       
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
         type:Schema.Types.ObjectId,
         ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}})
    }
})


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
