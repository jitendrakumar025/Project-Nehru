const router=require("express").Router();
const fetchuser=require("../middleware/fetchUser");
const room_controller=require("../controllers/room_controller");

//ROUTE:1 GET ALL THE Rooms Detail FROM THE DATABASE ,GET "/api/room/fetchrooms"
router.get('/fetchrooms',fetchuser,room_controller.fetch_rooms)
//ROUTE:2 ADD NEW Room USING :GET "/api/rooms/addrooms"
router.post('/addrooms',fetchuser,room_controller.add_rooms)
//ROUTE:3 UPDATE ROOM USING :PUT "/api/rooms/updaterooms"
router.put('/updaterooms/:id',fetchuser,room_controller.update_rooms)
//ROUTE:4 DELETE ROOM DETAILS USING :DELETE "/api/rooms/deleterooms"
router.delete('/deleterooms/:id',fetchuser,room_controller.delete_rooms)

module.exports=router