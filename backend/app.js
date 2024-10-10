const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const journalRoutes = require('./routes/journalRoutes');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use('/api', journalRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
