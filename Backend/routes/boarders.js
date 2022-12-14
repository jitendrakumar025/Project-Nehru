const router=require("express").Router();
const fetchuser=require("../middleware/fetchUser")
const boarder_controller=require("../controllers/boarder_controller")
//ROUTE:1 GET ALL  BOARDER Detail FROM THE DATABASE ,GET "/api/boarders/fetchboarders"
router.get('/fetchboarders',fetchuser,boarder_controller.fetch_boarder)
//ROUTE:2 ADD NEW BOARDER USING :POST "/api/boarders/addboarders"
router.post('/addboarders',boarder_controller.add_boarder)
//ROUTE:3 UPDATE BOARDER USING :PUT "/api/boarders/updateboarders/:id"
router.put('/updateboarders/:id',fetchuser,boarder_controller.update_boarder)
//ROUTE:4 DELETE BOARDER DETAILS USING :DELETE "/api/boarders/deleteboarders/:id"
router.delete('/deleteboarders/:id',fetchuser,boarder_controller.delete_boarder)

module.exports=router