const express = require('express');
const Member = require('../models/Member');
const router = express.Router();

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

module.exports = router;
