const mongoose = require("mongoose");
const {Schema} = mongoose;


const  main=async()=>{
    mongoose.connect("mongodb://localhost:27017/deletion");
}
main().then(()=>{
    console.log("mongodb connected success fully");
}).catch((err)=>{
    console.log(err);
})


const userSchema = new Schema({
    name:String,
    order:[
        {
            type:Schema.Types.ObjectId,
            ref:'order'
        }
    ]
})

const orderSchema = new Schema({
    item:String,
    price:Number,
})
// userSchema.pre("findOneAndDelete",async()=>{
//     console.log("in pre")
// })
userSchema.post("findOneAndDelete",async(res)=>{
    if(res.order.length){
       let data = await order.deleteMany({_id:{$in: res.order}})
       console.log(data);
    }
})
const user = mongoose.model('user',userSchema);
const order = mongoose.model('order',orderSchema);


const add = async()=>{
    const newUser = new user({
        name:"arvind",
        order:[],
    })

    const newOrder = new order({
        item:"total",
        price:250,
    })

    newUser.order.push(newOrder);

    await newUser.save();
    await newOrder.save();

    console.log("successfully added❤");
}
// add();

const find = async()=>{
    console.log(await user.find({}).populate("order"))
    console.log(await order.find({}))
}
const remove = async()=>{
    await user.deleteMany({});
    await order.deleteMany({});
}
// remove();

// find();

const delcust= async() =>{
    console.log("hello")
    const data =await user.findByIdAndDelete('65a2cc07ac6b4f85650a178f')
    console.log(data);
    console.log("deleted❤")
}
delcust();


