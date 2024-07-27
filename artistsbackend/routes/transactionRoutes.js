const express = require('express');
const { Transaction } = require('../models/transaction');
const router = express.Router();

// Endpoint to add a new transaction
router.post('/transactions', async (req, res) => {
  try {
    const { date, description, credit, debit } = req.body;

    // Calculate running balance
    const lastTransaction = await Transaction.findOne({ order: [['date', 'DESC']] });
    let runningBalance = (lastTransaction ? lastTransaction.runningBalance : 0) + credit - debit;

    const transaction = await Transaction.create({ date, description, credit, debit, runningBalance });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Endpoint to get all transactions
router.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.findAll({ order: [['date', 'ASC']] });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add more endpoints as needed (e.g., update, delete)

module.exports = router;
