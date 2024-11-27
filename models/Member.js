const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  memberID: { type: String, required: true, unique: true },
  familyID: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('Member', memberSchema);
