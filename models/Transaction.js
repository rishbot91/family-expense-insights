const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  memberID: { type: String, required: true },
  familyID: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);
