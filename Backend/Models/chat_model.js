const mongoose = require('mongoose');
const Chat_schema = mongoose.Schema({
    project_id : {
        type:String,
    },
    sender_id : {
        type:String,
    },
    receiver_id : {
        type:String,
    },
    content : {
        type:String,
    },
    timestamp : {
        type:String,
    },
})
module.exports = mongoose.model('chat',Chat_schema)