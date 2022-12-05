const express= require("express");
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const router=express.Router();
const jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchUser")

//ROUTE:1 create a user using :POST "/api/auth/userauth" doesn't require AUTH
router.post('/userauth',[
    body('email','enter valid email').isEmail(),
    body('password','must be at least 5 chars long').isLength({ min: 5 }),
    body('name','must be at least 3 chars long').isLength({ min: 3 }),

],async (req,res)=>{
    //displaying error here...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    //check whether the user with the same email exits or not 
    try{
     let user=await User.findOne({email: req.body.email})
     console.log(user)
     if(user){
        return res.status(400).json({error:"This id already exit,Please use different email"})
     }
     const salt = bcrypt.genSaltSync(10);
     const hashpass =bcrypt.hashSync(req.body.password, salt);
     //creating new user
    user=await User.create({
        name: req.body.name,
        password: hashpass,
        email: req.body.email
      })
    //   .then(user => res.json(user)).catch(err=>{console.log(err),
    //   res.json({error:"Please enter a unique value for email" ,message:err.message})}
    //   );
    const Data={
      user:{
        id:user.id
      }
    }
    const JWT_SECRET="sECUREKEY";
    var token = jwt.sign(Data, JWT_SECRET);
    // console.log(token)
    res.json({token:token});
}
//displaying other code or syntax error  with  using catch
catch(error){
console.log(error.message)
res.status(500).send("Some error occured")
}
})
//ROUTE:2 create a user using :POST "/api/auth/login" 
router.post('/login',[
  body('email','enter valid email').isEmail(),
  body('password','Password can not be blank').exists(),

],async (req,res)=>{
  //displaying error here...
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const {email,password}=req.body;
  try {
    let user=await User.findOne({email})
    if(!user){
      return res.status(400).json({error:"Please try to login with correct user credentials"})
    }
    const passCompare=await bcrypt.compare(password,user.password)
    if(!passCompare){
      return res.status(400).json({error:"Please try to login with correct user credentials"})

    }
    const payload={
      user:{
        id:user.id
      }
    }
    const JWT_SECRET="sECUREKEY";
    var token = jwt.sign(payload, JWT_SECRET);
    // console.log(token)
    res.json({token:token});
  } catch(error){
    console.log(error.message)
    res.status(500).send("Internal server error occured")
    }

})
//ROUTE:3 VIEWING USER DETAILS AFTER LOGIN 
router.post("/getuser",fetchuser,async (req,res)=>{
  try {
    let userId=req.user.id;
    const user=await User.findById(userId).select("-password")
    res.send(user);
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal server error occured")
  }
})
module.exports=router