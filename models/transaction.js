const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
const TransactionSchema = new Schema({
    amount: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD")
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
})

module.exports = Transaction = mongoose.model('transactions',TransactionSchema);