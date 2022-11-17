const mongoose = require('mongoose');
const freelancer_schema = mongoose.Schema({
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
    cv:{
        type:String
    },
    currency:{
        type:Number
    },
    invitations:{
        type:Array
    },
    created_date:{
        type:Date
    },
    profile_photo:{
        type:String
    }
})
module.exports = mongoose.model("freelancer",freelancer_schema)