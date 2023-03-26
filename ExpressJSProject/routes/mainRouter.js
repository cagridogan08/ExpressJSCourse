const express = require("express");
var indexRouter = require('./index');
var usersRouter = require('./users');
var controllerRouter = require('./question')
var accessControl = require('./MiddleWare');
var authRouter = require("./auth");
var router = express.Router();
// /api
router.use('/', indexRouter);
router.use('/auth',authRouter);

router.use('/users', usersRouter);

router.use('/questions', controllerRouter);


module.exports = router;