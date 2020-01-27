const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const uuid = require("uuid");
const userDb = require("../users/user-model");

const activeSessions = [];

router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const newUserData = { username, password: hashedPassword };
    const newUser = await userDb.insert(newUserData);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await userDb.getByUsername(username);
    const passwordCheck = await bcryptjs.compare(password, user.password);
    if (passwordCheck) {
      const newSessionId = uuid();
      activeSessions.push(newSessionId);
      res.cookie("sessionId", newSessionId, { maxAge: 900000 });
      res.status(200).json({ message: `Successfull login!` });
    } else {
      res.status(401).json({ message: `You shall not pass!` });
    }
  } catch (error) {
    next(error);
  }
});

function protected(req, res, next) {
  if (activeSessions.includes(req.cookies.sessionId)) {
    next();
  } else {
    res.status(401).json({
      message: `Your cookie is either not there, or it contains no valid sessionId`
    });
  }
}
router.protected = protected;

module.exports = router;
