exports.signupValidator = (req,res,next)=>{
    const {name,email,username,password,bio} = req.body;

    if(name && email && username && password && bio){
        next()
    }else{
        res.status(400).json({
            success: false,
            message: "all Input Fields are required"
        })
    }
}