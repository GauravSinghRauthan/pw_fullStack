const mongoose = require('mongoose')

const connectTODB = async ()=>{
    mongoose
    .connect(process.env.MONGOOSE_URL)
    .then((con)=>{
        console.log(`datebase connected on ${con.connection.host}`)
    })
    .catch((e)=>{
        console.log(e.message)
    })
}

module.exports = connectTODB