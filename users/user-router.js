const router = require("express").Router();
const userDb = require("../users/user-model");
const protected = require("../auth/auth-router").protected;

router.get("/", protected, async (req, res, next) => {
  try {
    const users = await userDb.get();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
