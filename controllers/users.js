const User = require("../models/user")
module.exports.renderSingUpForm = (req,res)=>{
    res.render("users/singup.ejs");
}

module.exports.createUser = async(req,res)=>{
    try{
    let{username,email,password} = req.body
    // console.log(username,email,password)

    const newUser = new User({email,username})
    const registeredUser= await User.register(newUser,password);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","user created Successfully");
        res.redirect("/listings");
    })
    
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/singup");
    }
}

module.exports.renderLoginForm =(req,res)=>{
    res.render("users/login.ejs");
}

module.exports.login =async (req,res)=>{
    req.flash("success","logged in successfully");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logOut = (req,res,next)=>{
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        
        req.flash("error", "Logged out successfully");
        console.log(res.locals);
        res.redirect("/listings");
    });
}