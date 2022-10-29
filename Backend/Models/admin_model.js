const mongoose = require('mongoose');
const Admin_schema = mongoose.Schema({
    email: {
        type:String,
    },
    password: {
        type:String,
    },
    phone:{
        type:String,
    },
    name:{
        type:String
    },
    role:{
        type:String
    },
    currency:{
        type:Number
    }
})
module.exports = mongoose.model("admin",Admin_schema)