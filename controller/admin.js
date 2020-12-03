const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const Music = require("../models/music");
const uuid = require("uuid");
const User = require("../models/user");
// const passportLocalMongoose = require("passport-local-mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.adminHome = async function (req, res) {
  let userNumber = await User.countDocuments({});
  let musicNumber = await Music.countDocuments({});
  // .exec((err, numOfUsers) => {
  //   userNumber = numOfUsers
  // })
  // .exec((err, numOfMusic) => {
  //   musicNumber = numOfMusic
  // })
  res.render("admin", {userNumber, musicNumber});
};

exports.createMusicGet = function (req, res) {
  res.render("musiccrud");
};

exports.createMusicPost = function (req, res) {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    // res.json(files.photos.path + path.extname(files.photos.name));

    cloudinary.uploader.upload(
      files.musicPoster.path,
      {
        resource_type: "image",
        public_id: `MusicSite/${uuid()}`,
        overwrite: true,
      },
      (err, result) => {
        const newMusic = fields;
        newMusic.photoDetails = result;
        const saveMusic = new Music(newMusic)
        saveMusic.save((err, savedMusic) => {
          res.render("musiccrud");
        })
      }
    );
  });
};


exports.manageMusicGet = function(req,res){
  Music.find({}).exec((err, allMusic) => {
    if(err){
      console.log(err);
    }
    res.render("managemusic", {allMusic})
  })
  
}

exports.deleteMusic = function(req,res){
  Music.findOneAndDelete({_id:req.params.musicId}).exec((err,deletedMusic)=>
  {
    if (err)
    {
      console.log(err);
    }
    // console.log(deletedMusic);
    cloudinary.uploader.destroy(deletedMusic.photoDetails.public_id, (err,result)=>{
      res.redirect("/admin/music/manage");

    });
    
  })
}

exports.updateMusic = function(req,res){
   Music.findOne({_id:req.params.musicId}).exec((err,music) => {
     if (err){
       console.log(err);
     }
     res.render("musicupdate",{music})

   })

}

// exports.updateMusicPost = function(req,res){
//   const form = formidable({ multiples: true });

//   form.parse(req, (err, fields, files) => {
//     // res.json(files.photos.path + path.extname(files.photos.name));
//     const updateMusic = fields
// if (files){
//   // console.log(files);
//     cloudinary.uploader.upload(
//       files.musicPoster.path,
//       {
//         resource_type: "image",
//         public_id: `MusicSite/${uuid()}`,
//         overwrite: true,
//       },
//       (err, result) => {
//         // console.log(err)
//         console.log(result);
//         const updatedPoster = result
//         updateMusic.photoDetails = updatedPoster

//       }
//       );
//     }
//     console.log(updateMusic.photoDetails);
//   Music.({_id: req.params.musicId}, updateMusic).exec((err,updateMusic)=>{
//     if(err){
//       console.log(err);
//     } 
//     res.redirect("/admin");
//   })
 

//   });
// } 



exports.manageUser = function(req,res){
  User.find({}).exec((err,user) =>{
    if (err) {
      console.log(err);
    } 

    res.render("manageuser",{allUser:user})
  })

}
exports.deleteUser = function(req,res){
  User.findOneAndDelete({_id:req.params.userId}).exec((err,deleteduser)=>
  {
    if (err)
    {
      console.log(err);
    }
    
    
      res.redirect("/admin/user/manage");

    
  })
}