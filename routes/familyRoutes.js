const express = require('express');
const Family = require('../models/Family');
const router = express.Router();

// Add a family
router.post('/add-family', async (req, res) => {
  const { familyID, income, savings, monthlyExpenses, loanPayments, creditCardSpending, dependents, financialGoalsMet } = req.body;

  try {
    const family = new Family({
      familyID,
      income,
      savings,
      monthlyExpenses,
      loanPayments,
      creditCardSpending,
      dependents,
      financialGoalsMet,
    });
    await family.save();
    res.status(201).json({ message: 'Family added successfully', family });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
