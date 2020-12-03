
const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")



const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required: true,
        maxlength: 32,
        trim: true,
        default:''
    },
    lastname: {
        type: String,
        // required: true,
        maxlength: 32,
        trim: true,
        default:''
    },
    username: {
        type: String,
        trim: true,
        // required: true,
        unique: true
    },
       password: {
        type: String,
        // required: true
    },
    // salt: String,
    role: {
        type: Number,
        default: 0
    },
    mobile: {
        type: Number,
        // required: true,
        maxlength: 11,
        default:0
        // trim: true
    },  
    age: {
        type: Number,
        // required: true,
        maxlength: 32,
        default:0
        // trim: true
    }, 
    country: {
        type: String,
        // required: true,
        maxlength: 32,
        default:'India',
        trim: true
    }
    
}, { timestamps: true });

// const User = new Schema({});


userSchema.plugin(passportLocalMongoose)



// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);