const crypto = require("crypto");
const uuid = require("uuid/v1");

const salt = uuid() 
const hashPassword =  crypto.createHmac('sha256', salt)
                .update("password")
                .digest('hex');

console.log(salt,hashPassword);
