const express = require('express');
const { addTransactions, readAllTransactions, readSingleTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionControllers');

const router = express.Router();

router.post('/', addTransactions);
router.get('/', readAllTransactions);
router.get('/:_id', readSingleTransaction);
router.put('/:_id', updateTransaction);
router.delete('/:_id', deleteTransaction);


module.exports = router;