const Rooms = require("../models/Room");
const {validationResult } = require('express-validator');

//ROUTE:1 GET ALL THE Rooms Detail FROM THE DATABASE ,GET "/api/room/fetchrooms"
exports.fetch_rooms=async(req,res)=>{
    try {
            const rooms =await Rooms.find({user:req.user.id})
            res.json(rooms) 
            
    } catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")      
    }
}


//ROUTE:2 ADD NEW Room USING :GET "/api/rooms/addrooms"
exports.add_rooms=async(req,res)=>{
    try {
    const {number,block,floor,boarder}=req.body

    //displaying error here...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
    }
const room=new Rooms({
    number,block,floor,boarder,user:req.user.id
})
const savedRoom=await room.save()
res.json(savedRoom)
} catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error occured")       
}

}

//ROUTE:3 UPDATE ROOM USING :PUT "/api/rooms/updaterooms"
exports.update_rooms=async(req,res)=>{
    try {
     const {number,block,floor,boarder}=req.body
    //create new room object 
    const newRoom={}
    if(number){newRoom.number=number}
    if(block){newRoom.block=block}
    if(floor){newRoom.floor=floor}
    if(boarder){newRoom.boarder=boarder}
    //finding,updating room and making secure 
    let room= await Rooms.findById(req.params.id)
    if(!room){return res.status(404).send("Not Found")}
    if(room.user.toString() !==req.user.id){
            return res.status(401).send("NOt Allowed")
    }
      room=await Rooms.findByIdAndUpdate(req.params.id,{$set:newRoom},{new:true})
      res.json(room)}
      catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")       
    }

}


//ROUTE:4 DELETE ROOM DETAILS USING :DELETE "/api/rooms/deleterooms"
exports.delete_rooms=async(req,res)=>{
    try{
    //finding rooms deleted or not and delete 
    let room= await Rooms.findById(req.params.id)
    if(!room){return res.status(404).send("Not Found")}
    if(room.user.toString() !==req.user.id){
            return res.status(401).send("NOt Allowed")
    }
      room=await Rooms.findByIdAndDelete(req.params.id)
      res.json({"Success":"Room details has been deleted successfully"})
}
      catch (error) {
            console.log(error.message)
            res.status(500).send("Internal server error occured")       
    }
}