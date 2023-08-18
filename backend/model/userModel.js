const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    bio : {
        type: String,
        required: true
    }
})

//genrater token
userSchema.methods={
    jwtToken(){
        return jwt.sign({id:this._id,username:this.username},process.env.SECRET,
            {expiresIn: '24h'})
    }
}

userSchema.pre("save",async function(next){
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12); //hashing password
    return next();
})

module.exports = mongoose.model('user',userSchema)