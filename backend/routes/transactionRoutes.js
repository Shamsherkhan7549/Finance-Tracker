const express = require('express');
const { addTransactions, readAllTransactions, readSingleTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactionControllers');

const router = express.Router();

router.post('/api/transactions', addTransactions);
router.get('/api/transactions', readAllTransactions);
router.get('/api/transactions/:_id', readSingleTransaction);
router.put('/api/transactions/:_id', updateTransaction);
router.delete('/api/transactions/:_id', deleteTransaction);


module.exports = router;