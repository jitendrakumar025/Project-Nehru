const mongoose=require("mongoose");
const mongoURI="mongodb://localhost:27017/ProjectNehru"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To Mongo Successfully")
    })
}

module.exports=connectToMongo;