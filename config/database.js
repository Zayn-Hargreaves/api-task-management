const mongoose = require("mongoose");
module.exports.connect = async() =>{
    try {
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connect Success!")
    } catch (error) {
       console.log(error)
    }
}
