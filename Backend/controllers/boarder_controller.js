const Boarders = require("../models/Boarder");
const {validationResult } = require('express-validator');

//ROUTE:1 GET ALL  BOARDER Detail FROM THE DATABASE ,GET "/api/boarder/fetchboarders"
exports.fetch_boarder=async(req,res)=>{
    try {
            const boarders =await Boarders.find({user:req.user.id})
            res.json(boarders) 
            
    } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")      
    }
}

//ROUTE:2 ADD NEW BOARDER USING :GET "/api/boarders/addboarders"
exports.add_boarder=async(req,res)=>{
    try {
    const {name,roll_no,email,mobile,is_graduated,graduation_year}=req.body

    //displaying error here...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }
const boarder=new Boarders({
name,roll_no,email,mobile,is_graduated,graduation_year
})
const savedBoarder=await boarder.save()
res.json(savedBoarder)
} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error occured")       
}

}

//ROUTE:3 UPDATE BOARDER USING :PUT "/api/boarders/updateboarders/:id"
exports.update_boarder=async(req,res)=>{
    try {
     const {email,mobile,is_graduated,graduation_year}=req.body
    //create new Boarder object 
    const newBoarder={}
    if(email){newBoarder.email=email}
    if(mobile){newBoarder.mobile=mobile}
    if(is_graduated){newBoarder.is_graduated=is_graduated}
    if(graduation_year){newBoarder.graduation_year=graduation_year}
    //finding,updating Boarder and making secure 
    let boarder= await Boarders.findById(req.params.id)
    if(!boarder){return res.status(404).send("Not Found")}
    if(boarder.user.toString() !==req.user.id){
            return res.status(401).send("NOt Allowed")
    }
      boarder=await Boarders.findByIdAndUpdate(req.params.id,{$set:newBoarder},{new:true})
      res.json(boarder)}
      catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")       
    }

}

//ROUTE:4 DELETE BOARDER DETAILS USING :DELETE "/api/boarders/deleteboarders/:id"
exports.delete_boarder=async(req,res)=>{
    try{
    //finding Boarders deleted or not and delete 
    let boarder= await Boarders.findById(req.params.id)
    if(!boarder){return res.status(404).send("Not Found")}
    if(boarder.user.toString() !==req.user.id){
            return res.status(401).send("NOt Allowed")
    }
      boarder=await Boarders.findByIdAndDelete(req.params.id)
      res.json({"Success":"Boarder details has been deleted successfully"})
}
      catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")       
    }
}
