const db = require('../db');
const { exec } = require('child_process');
const axios = require('axios');

// Absolute paths for the Python script and virtual environment
const pythonPath = '/Users/isaiaspalma/Documents/Professional/Work/echo-mental-health-journal/venv/bin/python3';
const scriptPath = '/Users/isaiaspalma/Documents/Professional/Work/echo-mental-health-journal/backend/sentiment/analyze_sentiment.py';

// Helper function to execute the sentiment analysis script
const runSentimentAnalysis = (text) => {
  return new Promise((resolve, reject) => {
    const command = `${pythonPath} ${scriptPath} "${text}"`;
    console.log('Executing command:', command);  // Log the command for debugging

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Execution error: ${error.message}`);
        return reject(new Error('Failed to execute sentiment analysis.'));
      }
      if (stderr) {
        console.error(`Script error: ${stderr}`);
        return reject(new Error('Error in sentiment analysis script.'));
      }
      console.log(`Output: ${stdout.trim()}`);
      resolve(stdout.trim());
    });
  });
};

// Controller function to analyze sentiment of a journal entry
exports.analyzeSentiment = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required for sentiment analysis.' });
  }

  try {
    const sentiment = await runSentimentAnalysis(content);
    res.status(200).json({ sentiment });
  } catch (error) {
    console.error('Error during sentiment analysis:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Function to analyze a journal entry using the Python NLP service
const analyzeJournalEntry = async (text) => {
  try {
    // Call the Python endpoint for NLP analysis
    const response = await axios.post('http://localhost:5000/analyze', { text });
    return response.data;
  } catch (error) {
    console.error('Error analyzing journal entry via Python endpoint:', error);
    throw new Error('Failed to analyze journal entry via NLP service.');
  }
};

// Function to save a journal entry along with analysis results
const saveJournalEntryWithAnalysis = async (text, analysis) => {
  const sql = 'INSERT INTO journal_entries (text, analysis) VALUES (?, ?)';
  try {
    await db.query(sql, [text, JSON.stringify(analysis)]);
  } catch (error) {
    console.error('Error saving to database:', error);
    throw new Error('Failed to save journal entry.');
  }
};

// Controller function to handle creating a new journal entry
exports.createEntry = async (req, res) => {
  const { title, content } = req.body;

  if (!content || !title) {
    return res.status(400).json({ error: 'Title and content are required for creating a journal entry.' });
  }

  try {
    // Run sentiment analysis
    const sentiment = await runSentimentAnalysis(content);

    // Save the journal entry along with sentiment
    const query = 'INSERT INTO journal_entries (title, content, sentiment) VALUES (?, ?, ?)';
    db.query(query, [title, content, sentiment], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to save journal entry.' });
      }
      res.status(201).json({ message: 'Journal entry created successfully', id: results.insertId });
    });
  } catch (error) {
    console.error('Error creating journal entry:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controller function to fetch all journal entries
exports.getAllEntries = (req, res) => {
  const query = 'SELECT * FROM journal_entries';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch journal entries.' });
    }
    res.status(200).json(results);
  });
};

// Controller function to fetch a specific journal entry by ID
exports.getEntryById = (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM journal_entries WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch journal entry.' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.status(200).json(results[0]);
  });
};

// Controller function to update a journal entry by ID
exports.updateEntry = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required for updating a journal entry.' });
  }

  const query = 'UPDATE journal_entries SET title = ?, content = ? WHERE id = ?';
  db.query(query, [title, content, id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update journal entry.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.status(200).json({ message: 'Journal entry updated successfully' });
  });
};

// Controller function to delete a journal entry by ID
exports.deleteEntry = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM journal_entries WHERE id = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to delete journal entry.' });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }
    res.status(200).json({ message: 'Journal entry deleted successfully' });
  });
};
