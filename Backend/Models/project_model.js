const mongoose = require('mongoose');
const project_schema = mongoose.Schema({
    employer_id: {
        type: String
    },
    freelancer_id:{
        type: String,
    },
    admin_id:{
        type:String
    },
    title: {
        type:String,
    },
    description:{
        type:String,
    },
    skillset:{
        type:Array
    },
    language:{
        type:Array
    },
    candidate:{
        type:Array
    },
    payment:{
        type:Number
    },
    expire_date:{
        type:Number
    },
    deadline:{
        type:Date
    },
    dashboard_id:{
        type: String,
    },
    is_approved:{
        type:Boolean
    },
    created_date:{
        type:Date
    }
})
module.exports = mongoose.model("project",project_schema)