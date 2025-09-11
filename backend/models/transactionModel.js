const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        required: true
    },
   
    category: {
        type: String,
        required: true
    }

});

const TRANSACTION = mongoose.model("TRANSACTION", transactionSchema);

module.exports = TRANSACTION