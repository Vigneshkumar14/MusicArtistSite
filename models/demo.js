const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const demoSchema = mongoose.Schema({
    userid:{ type:ObjectId, ref: 'User' 
    },
    fullname:{
        type:String,
        trim:true
    },
    email:{
        type:String,

    },
    audio:{
        type:Object
    },
    trackdescription:{
        type:String
    }

})

const Demo = mongoose.model('Demo',demoSchema);
module.exports = Demo;