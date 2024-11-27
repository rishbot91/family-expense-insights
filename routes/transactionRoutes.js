const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Add a transaction
router.post('/add-transaction', async (req, res) => {
  const { memberID, familyID, category, amount, date } = req.body;

  try {
    const transaction = new Transaction({ memberID, familyID, category, amount, date });
    await transaction.save();
    res.status(201).json({ message: 'Transaction added successfully', transaction });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all transactions for a family
router.get('/:familyID', async (req, res) => {
  const { familyID } = req.params;

  try {
    const transactions = await Transaction.find({ familyID });
    if (!transactions.length) return res.status(404).json({ message: 'No transactions found for this family' });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
  

module.exports = router;
