const express = require('express');
const router = express.Router();
const journalController = require('../controllers/journalController');

// Route to create a new journal entry with NLP analysis
router.post('/journal', journalController.createEntry);

// Route to get all journal entries
router.get('/journal', journalController.getAllEntries);

// Route to get a specific journal entry by ID
router.get('/journal/:id', journalController.getEntryById);

// Route to update a journal entry by ID
router.put('/journal/:id', journalController.updateEntry);

// Route to delete a journal entry by ID
router.delete('/journal/:id', journalController.deleteEntry);

// Route to analyze sentiment separately
router.post('/journal/analyze', journalController.analyzeSentiment);

module.exports = router;
