const TRANSACTION = require('../models/transactionModel.js');

// Add Transactions in DB
const addTransactions = async (req, res) => {
    try {
        if (!req.body) return res.status(400).json({ success: false, message: "Please Enter All Data" });

        const {title, amount, date, category, type} = req.body;

        const [day, month, year] = date.split("/");
        const formattedDate = new Date(`${year}-${month}-${day}`);


        const savedTransaction = await TRANSACTION.create({title, amount, date:formattedDate, category, type});

        if (!savedTransaction) return res.status(400).json({ success: false, message: "Transaction not saved, Try Again..." });

        return res.status(200).json({ success: true, message: "Transaction Saved" });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Read All Transactions from DB
const readAllTransactions = async (req, res) => {
    try {
        const allTransactions = await TRANSACTION.find({});

        if (allTransactions.length <= 0) return res.status(404).json({ success: false, message: "Transactions not Found" });

        return res.status(200).json({ success: true, transaction: allTransactions });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const readSingleTransaction = async (req, res) => {
    try {
        const { _id } = req.params;

        const singleTransaction = await TRANSACTION.findById(_id);

        if (singleTransaction === null) return res.status(404).json({ success: false, message: "Transaction not Found" });

        return res.status(200).json({ success: true, transaction: singleTransaction });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}



module.exports = { addTransactions, readAllTransactions, readSingleTransaction};