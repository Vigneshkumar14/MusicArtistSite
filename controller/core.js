// Home
const Music = require("../models/music");
const User = require("../models/user");
const Demo = require("../models/demo");
const cloudinary = require("cloudinary").v2;
const formidable = require("formidable");
const uuid = require("uuid");


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.home =  function(req, res)  {
    res.render("index");
  };


// Music 

exports.music = function (req, res) {
  Music.find({}).exec((err, allMusic) => {
    if(err){
      console.log(err);
    }
    res.render("music", {allMusic})
  })
}
exports.demoSubmission = function(req,res){
  res.render("demosubmission",{user:req.user});
}


exports.demoSubmissionpost = function(req,res){
  
  
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    // res.json(files.photos.path + path.extname(files.photos.name));
    // let {fullname,
    //   email,
    //   trackdescription} = fields;

// console.log(files)
    cloudinary.uploader.upload(
      files.demofile.path,
      {
        resource_type: "video",
        public_id: `demo/${uuid()}`,
        overwrite: true,
      },
      (err, result) => {
       
        const newDemo = fields;
        newDemo.userid = req.user._id;
        newDemo.audio = result;
        const saveDemo = new Demo(newDemo)
        saveDemo.save((err, savedDemo) => {
          res.redirect("/demosubmission");
        })
      }
    );
  });
  
};


exports.video = function(req,res){
  Music.find({}).exec((err, allMusic) => {
    if(err){
      console.log(err);
    }
    res.render("video", {allMusic})
  })
  // res.render("video");
}

exports.about = function(req,res){
  res.render("about");
}

exports.profile = function(req,res){
 

     res.render("profile",{user:req.user})
 


  // res.render("profile"); 
}

// exports.ajax = function(req,res){
//   res.render("Stocks");
// }

exports.profilepost = function(req,res){ 
  // console.log(req.params.id);
  
  const mybodydata = {
    firstname:req.body.first_name,
    lastname:req.body.last_name,
    mobile:req.body.mobile,
    age:req.body.age,
    country:req.body.country
  }
  console.log(mybodydata);
User.findByIdAndUpdate(req.params.id,mybodydata,function(err,updateduser){
  if(err){
    console.log(err)
  }
  res.redirect("/profile");
  // console.log(updateduser);
})

}

