const jwt = require('jsonwebtoken');
const JWT_SECRET="sECUREKEY";

const fetchuser=(req,res,next)=>{
const token=req.header("auth_token");
if(!token){
    res.status(401).send({error:"Please authenticate with a valid token"})
}
try {
    const userData=jwt.verify(token,JWT_SECRET);
    req.user=userData.user;
    next();
} catch (error) {
    res.status(401).send({error:"Please authenticate with a valid token"})
}

}
module.exports=fetchuser