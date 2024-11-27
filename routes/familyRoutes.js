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

// Savings Optmization
router.post('/savings-optimization', async (req, res) => {
    const { familyID } = req.body;
  
    try {
      const family = await Family.findOne({ familyID });
      if (!family) return res.status(404).json({ message: 'Family not found' });
  
      const { income, monthlyExpenses, dependents } = family;
  
      const baseRatio = 0.6; // Default ratio for expenses
      const dependentAdjustment = Math.min(dependents, 4) * 0.05; // Adjust ratio based on dependents
      const idealRatio = baseRatio - dependentAdjustment;
  
      const idealExpenses = income * idealRatio;
      const overspending = monthlyExpenses > idealExpenses;
  
      const suggestedSavingsPercentage = (((income - monthlyExpenses) / income) * 100).toFixed(2);
  
      res.json({
        idealRatio: idealRatio.toFixed(2),
        idealExpenses,
        currentExpenses: monthlyExpenses,
        overspending,
        suggestedSavingsPercentage,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;
