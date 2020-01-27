//create router instance
const router = require('express').Router()

//import routers
const authRouter = require("../auth/auth-router");
const userRouter = require("../users/user-router");

//connect routers
router.use('/auth', authRouter);
router.use('/users', userRouter);

module.exports = router;