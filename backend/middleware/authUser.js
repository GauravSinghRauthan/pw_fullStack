const jwt = require('jsonwebtoken')

exports.authenticateUser = async (req,res,next) =>{
    // const token = (req.cookies && req.cookies.token) || null 
    const token = req.cookies?.token || null
    if(!token) return res.status(400).json({success:false,message:"user authentication failed"})

    try{
        const payload = await jwt.verify(token,process.env.SECRET)
        req.user = {id: payload.id,username: payload.username}
        next()
    }catch(e){
        return res.status(400).json({success:false,message: e.message})
    }
}
