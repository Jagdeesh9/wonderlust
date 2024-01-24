const mongoose = require("mongoose")
const {Schema} = mongoose;


const  main=async()=>{
    mongoose.connect("mongodb://localhost:27017/relation");
}
main().then(()=>{
    console.log("mongodb connected success fully");
}).catch((err)=>{
    console.log(err);
})

const orderSchema = new Schema({
    item:String,
    price:Number,
})

const orderModel = mongoose.model("order",orderSchema);

const customerSchema = new Schema({
    name:String,
    order:[
        {
         type:Schema.Types.ObjectId,
         ref:'orderModel',
        }
    ]
})

const customerModel = mongoose.model("customer",customerSchema);

 const createCustomer = async()=>{
   const user = await customerModel.create({
    name:"hemu",
    order:[],
   })

   let item1 = await orderModel.findOne({item:"Mobile"})
   let item2 = await orderModel.findOne({item:"watcch"})

//    console.log(item1._id)
//    console.log(item2._idno)
   user.order.push(item1)
   user.order.push(item2)
   console.log(user);
}

const findCustomer = async() =>{
   const user = await customerModel.find({}).populate('order');
    console.log(user);
}

// createCustomer();
// findCustomer();

const all =async()=>{
    const a = await customerModel.deleteMany({});
     await orderModel.deleteMany({});
    // console.log(a);
}

// all();

// const createOrder = async()=>{
//     const res =await orderModel.insertMany([
//         {item:"laptop",price:25000},
//         {item:"Mobile",price:12000},
//         {item:"watcch",price:1000},
//     ])
//     console.log(res);
// }

// createOrder();

const addcus = async ()=>{
    const cust =new customerModel({
        name:"Jagdeesh"
    })

    let ood =new orderModel({
        item:"pizza",
        price:250,
    })

    cust.order.push = ood;

    await cust.save();
    await ood.save();

    console.log("created❤");
}
// addcus();

const alll = async()=>{
    console.log(await customerModel.find({}))
    console.log(await orderModel.find({}))
}
alll();