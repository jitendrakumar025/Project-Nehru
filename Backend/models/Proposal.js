const mongoose=require("mongoose")
const { Schema } = mongoose;
const ProposalSchema =new Schema({
    date:{
        type:Date,
        default:Date.now
    },
    intiated_by:{
        type:Object,
        required:true
    },
    purpose:{
        type:String,
        required:true
    },
    detailed_justification:{
        type:String,
        required:true
    },
    estimated_budget:{
        type:Number,
        required:true
    }
})
const Proposal=mongoose.model("proposal",ProposalSchema);
module.exports=Proposal;