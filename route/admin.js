const express = require("express");
const router = express.Router()
const { adminHome, createMusicPost, createMusicGet, manageMusicGet, deleteMusic, updateMusic, updateMusicPost,manageUser,deleteUser } = require("../controller/admin");
const { isAuthenticated,isAdmin } = require("../controller/auth");





router.get("/", isAuthenticated, isAdmin, adminHome);
router.get("/music/create",isAuthenticated,isAdmin,createMusicGet);
router.post("/music/create",isAuthenticated,isAdmin,createMusicPost);
router.get("/music/manage",isAuthenticated,isAdmin,manageMusicGet);
router.get("/music/delete/:musicId",isAuthenticated,isAdmin,deleteMusic);
router.get("/music/update/:musicId",isAuthenticated,isAdmin,updateMusic);
// router.put("/music/update/:musicId",isAuthenticated,isAdmin,updateMusicPost);
router.get("/user/manage",isAuthenticated,isAdmin,manageUser);
router.get("/user/delete/:userId",isAuthenticated,isAdmin,deleteUser)

module.exports = router 