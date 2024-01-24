const moongoose = require("mongoose")


const  main=async()=>{
    moongoose.connect("mongodb://localhost:27017/relation");
}
main().then(()=>{
    console.log("mongodb connected success fully");
}).catch((err)=>{
    console.log(err);
})


const userSchema = new moongoose.Schema({
    name:String,
    addresses:[
        {
            _id:false,
            location:String,
            city:String,
        }
    ]
})

const userModel=moongoose.model("user",userSchema);

const createUser= async()=>{
    const user = await userModel.create({
        name:"Jagdeesh",
        addresses:[
            {location:"Shyampur", city:"rishikesh"},
            {location:"Geetanagar", city:"rishikes"}
         ],
    })
    console.log(user);
}

createUser();