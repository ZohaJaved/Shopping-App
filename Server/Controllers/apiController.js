

export const checkSession=async(req,res)=>{
    console.log("Cookies:", req.cookies);
    console.log("apiController-->checkSession,req.session",req.session)
    if(req.session.user){  //checking if user is loggedIn
        console.log("loggedIn is true")
        res.status(200).json({loggedIn:true,userCart:req.session.user.cart});
    }
    else{
        console.log("loggedIn is false")
        res.status(200).json({loggedIn:false});
    }
}

//destroy session
export const destroySession=async(req,res)=>{
    console.log("destroySession");
    if(req.session){
        req.session.destroy((error)=>{
         if(error){
            return res.status(500).json({message:'logOut failed'})
         }
         res.clearCookie('session.user_zoha');
         return res.status(200).json({message:'Logout successful'})
        })
    }
    else{
        return res.status(400).json({message:'no session found'})
    }
}