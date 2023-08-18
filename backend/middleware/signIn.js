exports.signinValidator = (req,res,next)=>{
    const {username,password} = req.body;

    if( username && password){
        next()
    }else{
        res.status(400).json({
            success: false,
            message: "all Input Fields are required"
        })
    }
}