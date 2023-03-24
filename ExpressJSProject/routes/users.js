var express = require('express');
var router = express.Router();
//UserArray

var userList =   [
    { id: 1, name: "Cagri", place: "Eskisehir" },
    { id: 2, name: "Cagri", place: "Eskisehir" },
    { id: 2, name: "qxc", place: "Eskisehir" }

];
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json([
        {
            userList
        }]);
});


/*Get User By ID */

module.exports = router;
