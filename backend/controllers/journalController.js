const db = require('../db');
const { exec } = require('child_process');
const path = require('path');

// Create a new journal entry
exports.createEntry = (req, res) => {
  const { title, content } = req.body;
  console.log('Creating a new entry:', title, content); // Add this to verify the data is coming in
  const query = 'INSERT INTO journal_entries (title, content) VALUES (?, ?)';
  db.query(query, [title, content], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Journal entry created successfully', id: results.insertId });
    }
  });
};

// Get all journal entries
exports.getAllEntries = (req, res) => {
  const query = 'SELECT * FROM journal_entries';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
};

// Get a specific journal entry by ID
exports.getEntryById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM journal_entries WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.length === 0) {
      res.status(404).json({ message: 'Journal entry not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
};

// Update a journal entry by ID
exports.updateEntry = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = 'UPDATE journal_entries SET title = ?, content = ? WHERE id = ?';
  db.query(query, [title, content, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Journal entry not found' });
    } else {
      res.status(200).json({ message: 'Journal entry updated successfully' });
    }
  });
};

// Delete a journal entry by ID
exports.deleteEntry = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM journal_entries WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ message: 'Journal entry not found' });
    } else {
      res.status(200).json({ message: 'Journal entry deleted successfully' });
    }
  });
};

// Analyze sentiment of a journal entry
exports.analyzeSentiment = (req, res) => {
  const { content } = req.body;

  // Use the correct path for the sentiment analysis script
  const pythonPath = path.resolve(__dirname, '../../venv/bin/python3'); // For macOS/Linux
  const scriptPath = path.resolve(__dirname, '../sentiment/analyze_sentiment.py');  // Update path to sentiment folder

  exec(`${pythonPath} ${scriptPath} "${content}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing sentiment analysis: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Error in sentiment analysis script: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ sentiment: stdout.trim() });
  });
};
