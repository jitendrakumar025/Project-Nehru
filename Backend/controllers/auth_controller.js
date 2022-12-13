const User = require("../models/User");
const {validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.new_User=async (req,res)=>{
    //displaying error here...
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    //check whether the user with the same email exits or not 
    try{
     let user=await User.findOne({email: req.body.email});
     console.log(user);
     if(user){
        return res.status(400).json({error:"This id already exit,Please use different email"})
     }
     const salt = bcrypt.genSaltSync(10);
     const hashpass =bcrypt.hashSync(req.body.password, salt);
     //creating new user
    user=await User.create({
        name: req.body.name,
        password: hashpass,
        email: req.body.email,
        position:req.body.position
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
}

///$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$///////

exports.login=async (req,res)=>{
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
  }

  //############################################///////////////////////////

  exports.user=async (req,res)=>{
    try {
      let userId=req.user.id;
      const user=await User.findById(userId).select("-password")
      res.send(user);
    } catch (error) {
      console.log(error.message)
      res.status(500).send("Internal server error occured")
    }
  }