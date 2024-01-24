const mongoose = require("mongoose");
const Schema =mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
})

userSchema.plugin(passportLocalMongoose);//this add username and password field automatically and aslo hash them both
module.exports = mongoose.model("User",userSchema);
