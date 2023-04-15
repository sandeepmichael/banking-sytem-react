const mongoose = require('mongoose');

const transacthistorySchema = new mongoose.Schema({
    senderName:{
        type:String,
        require:true,
    },
    senderEmail:{
        type:String,
        require:true,
        unique:true,
    },
    receiverName:{
        type:String,
        require:true,
    },
    receiverEmail:{
        type:String,
        require:true,
        unique:true,
    },
    amount:{
        type:Number,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now(),

    }

})

const historyModel = mongoose.model('history', transacthistorySchema);

module.exports = historyModel;