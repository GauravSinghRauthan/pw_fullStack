const userModel = require('../model/userModel.js')

const bcrypt = require('bcrypt')

// signUp contoller
exports.signUp = async (req,res)=>{
    
    try{
        const newUser = await userModel.create(req.body)
        res.status(200).json({
            message: "user signup successfully"
        })
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message
        })
    }

}

// login controller

exports.signIn = async (req,res)=>{
    const {username,password} = req.body
    try{
        const user = await userModel.findOne({username}).select('+password')
        if(user && user.username){
            const result = await bcrypt.compare(password,user.password)
            if(result){
                const token = await user.jwtToken();
                const cookieOpetion = {
                    myAge: 24 * 60 * 60 * 1000,
                    httpOnly: true
                }

                res.cookie('token',token,cookieOpetion)
                res.status(200).json({
                    success: true,
                    message: "data get successfully",
                    data: user
                })
            }else{
                res.status(400).json({
                    message: "password not match "
                })
            }
        }else{
            res.status(400).json({
                message: "no account found "
            })
        }
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}

// get user Details

exports.getUserDetails = async(req,res) => {
    const {id,username} = req.user;

    try{
        const userData = await userModel.findOne({username});
        res.status(200).json({
            msg:"Success",
            data: userData
        })

    }
    catch(err){
        res.status(501).send({msg:err.message})
    }

}