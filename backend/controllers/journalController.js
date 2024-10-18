const db = require('../db');
const { exec } = require('child_process');
const path = require('path');

// Create a new journal entry
exports.createEntry = (req, res) => {
  const { title, content } = req.body;

  // Use absolute paths
  const pythonPath = '/Users/isaiaspalma/Documents/Professional/Personal_Projects/echo-mental-health-journal/venv/bin/python3';
  const scriptPath = '/Users/isaiaspalma/Documents/Professional/Personal_Projects/echo-mental-health-journal/backend/sentiment/analyze_sentiment.py';

  // Perform sentiment analysis before saving the entry
  const command = `${pythonPath} ${scriptPath} "${content}"`;
  console.log('Executing sentiment analysis command:', command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing sentiment analysis: ${error.message}`);
      return res.status(500).json({ error: error.message });
    }
    if (stderr) {
      console.error(`Error in sentiment analysis script: ${stderr}`);
      return res.status(500).json({ error: stderr });
    }

    const sentiment = stdout.trim();
    const query = 'INSERT INTO journal_entries (title, content, sentiment) VALUES (?, ?, ?)';
    db.query(query, [title, content, sentiment], (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ message: 'Journal entry created successfully', id: results.insertId });
      }
    });
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

  // Use the correct absolute paths. These will have to updated for production.
  const pythonPath = '/Users/isaiaspalma/Documents/Professional/Personal_Projects/echo-mental-health-journal/venv/bin/python3';
  const scriptPath = '/Users/isaiaspalma/Documents/Professional/Personal_Projects/echo-mental-health-journal/backend/sentiment/analyze_sentiment.py';

  console.log('Python Path:', pythonPath);  // Confirm Python path
  console.log('Script Path:', scriptPath);  // Confirm script path
  console.log('Current Working Directory:', process.cwd());  // Confirm working directory

  // Execute the command with the correct paths
  const command = `${pythonPath} ${scriptPath} "${content}"`;
  console.log('Executing command:', command);  // Log the exact command

  exec(command, (error, stdout, stderr) => {
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
