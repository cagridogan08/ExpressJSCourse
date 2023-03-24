var express = require('express');
var router = express.Router();
var {accessControl,defaultMiddleWare} = require('./MiddleWare');
var userList =   [
    { id: 1, name: "Cagri", place: "Eskisehir" },
    { id: 2, name: "Cagri", place: "Eskisehir" },
    { id: 2, name: "qxxc", place: "Eskisehir" }

];
router.use(express.json());

/* Middleware function  Executes before function */
//router.use(accessControl);
//[accessControl,defaultMiddleWare],
router.get('/', function (req, res, next) {
    res.json([
        {
            userList
        }]);
});

/*Get User By ID*/
router.get('/:id',
    (req, res, next) => {
        const id = parseInt(req.params.id);
        res.json(userList.find(e => e.id === id));
    });

/*Post*/
router.post('/',
    (req, res, next) => {
        console.log(req.body);
        const user = req.body;
        userList.push(req.body);
        res.json(userList);
    });


/** Update-> PUT */
//users/1
router.put("/:id",
    (req, res, next) => {
        var id = parseInt(req.params.id);
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].id === id) {
                userList[i] = {
                    ...userList[i]
                    ,...req.body
                }
            }
        }
        res.json(userList);

    });

/**Remove User by id*/
// users/delete/

router.delete("/:id",
    (res, req, next) => {
        var id = parseInt(req.params.id);
        for (let y = 0; y < userList.length; y++) {
            if (userList[y].id === id) {
                userList.splice(y, 1);
            }
        }
        res.json({ success:true,data:userList });
    });
module.exports = router;
