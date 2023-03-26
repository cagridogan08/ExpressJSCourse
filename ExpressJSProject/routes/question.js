///api/questions
const express = require("express");
var {getAllQuestions} = require("../controllers/question");
var router = express.Router();


router.use(express.json());


router.get('/',getAllQuestions);

router.get('/delete',(req,res)=>{

    res.send("Question Delete Page");
});

module.exports=router;