const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  familyID: { type: String, required: true, unique: true },
  income: { type: Number, required: true },
  savings: { type: Number, required: true },
  monthlyExpenses: { type: Number, required: true },
  loanPayments: { type: Number, required: true },
  creditCardSpending: { type: Number, required: true },
  dependents: { type: Number, required: true },
  financialGoalsMet: { type: Number, required: true }, // percentage
});

module.exports = mongoose.model('Family', familySchema);
