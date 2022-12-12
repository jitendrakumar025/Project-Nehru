const mongoose=require("mongoose")
const { Schema } = mongoose;
const RoomSchema =new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
        },
    number:{
        type:Number,
        required:true
    },
    block:{
        type:String,
        required:true
    },
    floor:{
        type:Object,
        required:true
    },
    boarder:{
        type:Array,
        required:true
    }
})
const Room=mongoose.model("rooms",RoomSchema);
module.exports=Room;