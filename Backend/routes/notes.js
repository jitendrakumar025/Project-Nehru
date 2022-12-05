const express=require("express")
const router=express.Router();
const Notes = require("../models/Notes");
const fetchuser=require("../middleware/fetchUser")
const { body, validationResult } = require('express-validator');


//ROUTE:1 GET ALL THE NOTES FROM THE DATABASE ,GET "/api/notes/fetchnotes"
router.get('/fetchnotes',fetchuser,async(req,res)=>{
        try {
                const notes =await Notes.find({user:req.user.id})
                res.json(notes) 
                
        } catch (error) {
                console.log(error.message)
                res.status(500).send("Internal server error occured")      
        }
})
//ROUTE:2 ADD NEW NOTE USING :GET "/api/notes/addnotes"
router.post('/addnotes',fetchuser, [
        body('title','enter a valid title').isLength({ min: 3 }),
        body('description','must be at least 6 chars long').isLength({ min: 6 }),
],async(req,res)=>{
        try {
        const {title,description,tag}=req.body

        //displaying error here...
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
        }
  const note=new Notes({
title,description,tag,user:req.user.id
  })
    const savedNote=await note.save()
    res.json(savedNote)
} catch (error) {
        console.log(error.message)
        res.status(500).send("Internal server error occured")       
}

})
//ROUTE:3 UPDATE NOTE USING :PUT "/api/notes/updatenotes"
router.put('/updatenotes/:id',fetchuser,async(req,res)=>{
        try {
        const {title,description,tag}=req.body
        //create new note object 
        const newNote={}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}
        //finding,updating note and making secure 
        let note= await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !==req.user.id){
                return res.status(401).send("NOt Allowed")
        }
          note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
          res.json(note)}
          catch (error) {
                console.log(error.message)
                res.status(500).send("Internal server error occured")       
        }

})
//ROUTE:4 DELETE NOTE USING :DELETE "/api/notes/updatenotes"
router.delete('/deletenotes/:id',fetchuser,async(req,res)=>{
        try{
        //finding notes deleted or not and delete 
        let note= await Notes.findById(req.params.id)
        if(!note){return res.status(404).send("Not Found")}
        if(note.user.toString() !==req.user.id){
                return res.status(401).send("NOt Allowed")
        }
          note=await Notes.findByIdAndDelete(req.params.id)
          res.json({"Success":"Note has been deleted successfully"})
}
          catch (error) {
                console.log(error.message)
                res.status(500).send("Internal server error occured")       
        }
})

module.exports=router