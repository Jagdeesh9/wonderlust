const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

console.log(typeof initData.data)

const MONGO_URL = "mongodb://localhost:27017/wanderlust"
//connecting Database
main().then(()=>{
    console.log("connected to mongo DB");
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"65ad2d257656ee3644da8230"}));
    console.log(initData.data[0])
    await Listing.insertMany(initData.data);
    console.log("data initialized successfully");
}
initDB();
