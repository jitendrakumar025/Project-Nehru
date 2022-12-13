const router=require("express").Router();
const fetchuser=require("../middleware/fetchUser")
const {body}=require('express-validator')
const auth_controller=require('../controllers/auth_controller')
//ROUTE:1 create a user using :POST "/api/auth/userauth" doesn't require AUTH
router.post('/userauth',[
    body('email','enter valid email').isEmail(),
    body('password','must be at least 5 chars long').isLength({ min: 5 }),
    body('name','must be at least 3 chars long').isLength({ min: 3 }),

],auth_controller.new_User)
//ROUTE:2 create a user using :POST "/api/auth/login" 
router.post('/login',[
  body('email','Enter valid email').isEmail(),
  body('password','Password can not be blank').exists(),

],auth_controller.login)
//ROUTE:3 VIEWING USER DETAILS AFTER LOGIN 
router.post("/getuser",fetchuser,auth_controller.user)
module.exports=router