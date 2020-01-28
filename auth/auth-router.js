const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const userDb = require("../users/user-model");


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
      req.session.loggedIn = true;
      res.status(200).json({ message: `Successfull login!` });
    } else {
      res.status(401).json({ message: `You shall not pass!` });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req,res,next)=>{
  req.session.destroy(error=>{
    if(error){
      next(error);
    }else{
      res.status(200).json({message:`Logged out succesfully`})
    }
  })
})

function protected(req, res, next) {
  if (req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({
      message: `no cookie, OR cookie without a valid session id in the monkey`
    });
  }
}
router.protected = protected;

module.exports = router;
