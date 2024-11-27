const express = require('express');
const Member = require('../models/Member');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Add a new member
router.post('/add-member', async (req, res) => {
  const { memberID, familyID, name } = req.body;

  try {
    const member = new Member({ memberID, familyID, name });
    await member.save();
    res.status(201).json({ message: 'Member added successfully', member });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all members of a family
router.get('/:familyID', async (req, res) => {
  const { familyID } = req.params;

  try {
    const members = await Member.find({ familyID });
    if (!members.length) return res.status(404).json({ message: 'No members found for this family' });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Member Contribution Analysis
router.post('/contribution-analysis', async (req, res) => {
    const { familyID } = req.body;
  
    try {
      const transactions = await Transaction.find({ familyID });
      if (!transactions.length) return res.status(404).json({ message: 'No transactions found for this family' });
  
      const totalExpenses = transactions.reduce((sum, tx) => sum + tx.amount, 0);
      const memberContributions = {};
  
      transactions.forEach((tx) => {
        if (!memberContributions[tx.memberID]) {
          memberContributions[tx.memberID] = 0;
        }
        memberContributions[tx.memberID] += tx.amount;
      });
  
      const highestSpender = Object.keys(memberContributions).reduce((a, b) =>
        memberContributions[a] > memberContributions[b] ? a : b
      );
  
      const memberPercentages = Object.keys(memberContributions).map((memberID) => ({
        memberID,
        amount: memberContributions[memberID],
        percentage: ((memberContributions[memberID] / totalExpenses) * 100).toFixed(2),
      }));
  
      res.json({
        totalExpenses,
        memberPercentages,
        highestSpender,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });  

module.exports = router;
