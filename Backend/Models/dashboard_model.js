const mongoose = require('mongoose');
const dashboard_schema = mongoose.Schema({
    requirement:{
        type:String
    },
    progress:{
        type:Number
    },
    version:{
        type:String
    },
    project_demo:{
        type:String
    },
    project_file:{
        type:String
    },
    is_complete:{
        type:Boolean
    },
    freelancer_rating:{
        type:Object
    },
    employer_rating:{
        type:Object
    }
    
})
module.exports = mongoose.model("dashboard",dashboard_schema)