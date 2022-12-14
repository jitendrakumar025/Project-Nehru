const mongoose=require("mongoose");
const mongoURI="mongodb+srv://root:root022@cluster0.im9xsw5.mongodb.net/ProjectNehru"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected To Mongo Successfully")
    })
}

module.exports=connectToMongo;