const { Router } = require("express");
const express = require("express");
const { isAuthenticated } = require("../controller/auth");
const { home, music, demoSubmission, video, about, profile, profilepost,demoSubmissionpost, ajax } = require("../controller/core");
const router = express.Router()


router.get("/",home);
  
router.get("/music",isAuthenticated,music);
router.get("/demosubmission",isAuthenticated,demoSubmission);
router.post("/demosubmission",isAuthenticated,demoSubmissionpost);
router.get("/video",isAuthenticated,video);
router.get("/about",about);
router.get("/profile",isAuthenticated,profile);
router.post("/profile/:id",isAuthenticated,profilepost); 
// router.get("/ajax",ajax);

module.exports = router