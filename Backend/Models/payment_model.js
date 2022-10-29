const mongoose = require('mongoose');
const payment_schema = mongoose.Schema({
    sender_id:{
        type:String
    },
    receiver_id:{
        type:String
    },
    transaction_type:{
        type:String
    },
    currency:{
        type:Number
    },
    timestamp:{
        type:String
    },
})
module.exports = mongoose.model("payment",payment_schema)