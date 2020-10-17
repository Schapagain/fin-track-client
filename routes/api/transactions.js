const express = require('express');
const router = express.Router();

// Import utilities
const {getCleanTransactions} = require('../../utils/transactions')

// Import the transaction model
const Transaction = require('../../models/transaction');


// @route   GET api/transaction
// @desc    GET all transactions
// @access  Public
router.get('/', async (req,res) => {

    try{
        let transactions = await Transaction.find();

        // Clean up Transactions before responding
        transactions = getCleanTransactions(transactions);
        
        res.status(200).json({
            message: 'You have all the transactions now.',
            transactions,
        })
    }
    catch(err) {
        console.log(err);
        res.status(500).json({
            error: 'Could not get all transactions. Try again later.'
        })
    }
    
})

// @route   POST api/transaction
// @desc    Add a new transaction
// @access  Public
router.post('/', async (req,res) => {

    let newTransaction = {
        title: req.body.title,
        amount: req.body.amount,
    }

    if (!newTransaction.title || !newTransaction.amount){
        res.status(400).json({
            error: "Title and amount are required"
        })
    }

    // Add a date property if given
    if (req.body.date) newTransaction.date = req.body.date;     

    // Replace newTransaction with mongoose model
    newTransaction = new Transaction(newTransaction);

    try{
        let transaction = await newTransaction.save();

        // Clean up Transactions before responding
        transaction = getCleanTransactions(transaction).pop();

        res.status(200).json({
            message: 'New transaction has been added.',
            transaction,
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            error: 'Could not add a new transaction. Try again later.'
        })
    }
    
})


module.exports = router;