const { default: mongoose } = require("mongoose");
const moongoose = require("mongoose")
const {Schema} = mongoose;


const  main=async()=>{
    moongoose.connect("mongodb://localhost:27017/relation");
}
main().then(()=>{
    console.log("mongodb connected success fully");
}).catch((err)=>{
    console.log(err);
})

const userSchema = new Schema({
    username: String,
    email:String,
})

const postScema = new Schema({
    conten:String,
    likes:Number,
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    }
})

const user = mongoose.model("user",userSchema);
const post = mongoose.model("post",postScema);

const addData = async()=>{
    let user1= await user.findOne({username: 'jagdeesh'});

    const post1= new post({
        conten:"first post!",
        likes:1,
    })

    post1.user = user1;

    // await user1.save();
    await post1.save();
    // console.log(post2)
}   

// addData();n
const find = async() =>{
    // const alluser = await user.find({});
    const allpost = await post.find({}).populate('user','username') ;
    //  console.log(alluser);
     console.log(allpost);
 }

 find();

const remove =async()=>{
    const d = await post.deleteMany({});
    console.log(d);
}
// remove();