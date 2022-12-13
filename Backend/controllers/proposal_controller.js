const Proposals = require("../models/Proposal");
const {validationResult } = require('express-validator');

//ROUTE:1 GET ALL THE PROPOSALS Detail FROM THE DATABASE ,GET "/api/proposal/fetchproposals"
exports.fetch_proposals=async(req,res)=>{
    try {
            const proposals =await Proposals.find({user:req.user.id})
            res.json(proposals) 
            
    } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")      
    }
}

//ROUTE:2 ADD NEW PROPOSALS USING :GET "/api/proposals/addproposals"
exports.add_proposals=async(req,res)=>{
    try {
    const {purpose,detailed_justification,estimated_budget}=req.body

    //displaying error here...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }
const proposal=new Proposals({
purpose,detailed_justification,estimated_budget,user:req.user.id
})
const savedProposal=await proposal.save()
res.json(savedProposal)
} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error occured")       
}

}
//ROUTE:3 UPDATE PROPOSALS USING :PUT "/api/proposals/updateproposals"
exports.update_proposals=async(req,res)=>{
    try {
     const {purpose,detailed_justification,estimated_budget}=req.body
    //create new Proposal object 
    const newProposal={}
    if(purpose){newProposal.purpose=purpose}
    if(detailed_justification){newProposal.detailed_justification=detailed_justification}
    if(estimated_budget){newProposal.estimated_budget=estimated_budget}
    //finding,updating Proposal and making secure 
    let proposal= await Proposals.findById(req.params.id)
    if(!proposal){return res.status(404).send("Not Found")}
    if(proposal.user.toString() !==req.user.id){
            return res.status(401).send("NOt Allowed")
    }
      proposal=await Proposals.findByIdAndUpdate(req.params.id,{$set:newProposal},{new:true})
      res.json(proposal)}
      catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")       
    }

}


//ROUTE:4 DELETE PROPOSALS DETAILS USING :DELETE "/api/proposals/deleteproposals"
exports.delete_proposals=async(req,res)=>{
    try{
    //finding Proposals deleted or not and delete 
    let proposal= await Proposals.findById(req.params.id)
    if(!proposal){return res.status(404).send("Not Found")}
    if(proposal.user.toString() !==req.user.id){
            return res.status(401).send("NOt Allowed")
    }
      proposal=await Proposals.findByIdAndDelete(req.params.id)
      res.json({"Success":"Proposal details has been deleted successfully"})
}
      catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")       
    }
}