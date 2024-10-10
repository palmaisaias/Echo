const db = require('../db');

// Create a new journal entry
exports.createEntry = (req, res) => {
  const { title, content } = req.body;
  const query = 'INSERT INTO journal_entries (title, content) VALUES (?, ?)';
  db.query(query, [title, content], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ message: 'Entry saved! Reflect and grow at your own pace', id: results.insertId });
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
