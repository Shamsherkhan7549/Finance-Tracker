const express = require('express');
const { addTransactions, readAllTransactions, readSingleTransaction } = require('../controllers/transactionControllers');

const router = express.Router();

router.post('/', addTransactions);
router.get('/', readAllTransactions);
router.get('/:_id', readSingleTransaction);


module.exports = router;