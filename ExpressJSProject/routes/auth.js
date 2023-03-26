var express = require("express");
var router = express.Router();
var {getAccessToRoute}=require("../middlewares/authorization/auth");
var {register,tokentest,GetUser,login,logout} = require("../controllers/auth");
///api/auth

router.use(express.json());

router.post('/',(req,res)=>{

    res.send("Auth Home Page");
});


//api/auth/register
router.post('/register',register);

router.get("/profile",getAccessToRoute,GetUser);
router.post("/login",login);
router.get("/logout",logout);
module.exports = router;