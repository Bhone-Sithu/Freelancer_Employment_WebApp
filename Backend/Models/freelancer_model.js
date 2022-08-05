const mongoose = require('mongoose');
const freelancer_schema = mongoose.Schema({
    email: {
        type:String,
    },
    password: {
        type:String,
    },
    phone:{
        type:Number,
    },
    name:{
        type:String
    },
    country:{
        type:String
    },
    is_approved:{
        type:Boolean
    },
    skillset:{
        type:Array
    },
    language:{
        type:Array
    },
    role:{
        type:String
    },
    currency:{
        type:Number
    }
})
module.exports = mongoose.model("freelancer",freelancer_schema)