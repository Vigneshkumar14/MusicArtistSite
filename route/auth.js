const express = require("express");
const { signinGet, signinPost, signupGet, signupPost, signOut, isAuthenticated } = require("../controller/auth");
const router = express.Router();

// Signin 

router.get("/signin", signinGet);
router.post("/signin", signinPost);


// signup
router.get("/signup", signupGet);
router.post("/signup", signupPost);
  
// SignOut 

router.get("/signout", isAuthenticated,signOut);




module.exports = router