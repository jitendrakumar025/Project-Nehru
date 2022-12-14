const mongoose=require("mongoose")
const { Schema } = mongoose;
const BoarderSchema =new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        },
    name:{
        type:String,
        required:true
    },
    roll_no:{
        type:Object,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    is_graduated:{
        type:Boolean,
        required:true
    },
    graduation_year:{
        type:String,
        required:true
    }
})
const Boarder=mongoose.model("boarder",BoarderSchema);
module.exports=Boarder;