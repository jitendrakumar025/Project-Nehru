const router=require("express").Router();
const fetchuser=require("../middleware/fetchUser");
const proposal_controller=require("../controllers/proposal_controller");


//ROUTE:1 GET ALL THE PROPOSALS Detail FROM THE DATABASE ,GET "/api/proposal/fetchproposals"
router.get('/fetchproposals',fetchuser,proposal_controller.fetch_proposals);
//ROUTE:2 ADD NEW PROPOSALS USING :GET "/api/proposals/addproposals"
router.post('/addproposals',fetchuser,proposal_controller.add_proposals);
//ROUTE:3 UPDATE PROPOSALS USING :PUT "/api/proposals/updateproposals"
router.put('/updateproposals/:id',fetchuser,proposal_controller.update_proposals);
//ROUTE:4 DELETE PROPOSALS DETAILS USING :DELETE "/api/proposals/deleteproposals"
router.delete('/deleteproposals/:id',fetchuser,proposal_controller.delete_proposals);

module.exports=router;