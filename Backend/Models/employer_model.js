const mongoose = require('mongoose');
const Employer_schema = mongoose.Schema({
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
    company_name:{
        type:String
    },
    company_size:{
        type:Number
    },
    is_approved:{
        type:Boolean
    },
    company_address:{
        type:String
    },
    company_industry:{
        type:String
    },
    role:{
        type:String
    },
    currency:{
        type:Number
    }
})
module.exports = mongoose.models.employer || mongoose.model("Employer",Employer_schema)