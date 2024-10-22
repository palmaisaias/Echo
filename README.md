# Echo Mental Health Journal

Echo is a personal mental health journal that allows users to log daily journal entries and receive sentiment analysis feedback. The app uses natural language processing (NLP) via spaCy to help users understand the general tone of their entries, whether positive, negative, or neutral. Echo is designed to support mental well-being by providing insights into the emotional trends in users' journal entries over time.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- Create, view, update, and delete journal entries.
- Real-time sentiment analysis of each entry using spaCy.
- Save analysis results in a MySQL database.
- User-friendly interface built with Vue.js.
- Display past entries with sentiment feedback.

## Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- Python 3.x
- spaCy (NLP)
- Axios

### Frontend
- Vue.js 3
- Axios
- Bootstrap (for styling)

## Installation

### Prerequisites
Ensure you have the following installed on your local machine:
- Node.js (v14+)
- Python 3.x
- MySQL
- npm or yarn (for package management)

### Clone the Repository
```bash
git clone https://github.com/your-username/echo-mental-health-journal.git
cd echo-mental-health-journal
```

## Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Set up a Python virtual environment:**
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install Python dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up MySQL database:**
   - Create a MySQL database called `echo_journal`.
   - Update the database configuration in `backend/db.js` to match your local setup:
     ```javascript
     const mysql = require('mysql');
     const db = mysql.createConnection({
       host: 'localhost',
       user: 'your-username',
       password: 'your-password',
       database: 'echo_journal'
     });
     module.exports = db;
     ```

5. **Run database migrations:**
   - Execute the SQL script in `backend/db/migrations.sql` to create the required tables:
     ```sql
     CREATE TABLE journal_entries (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255),
       content TEXT,
       sentiment VARCHAR(50),
       analysis JSON,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
     ```

6. **Install backend dependencies:**
   ```bash
   npm install
   ```

7. **Start the backend server:**
   ```bash
   npm run start
   ```

8. **Run the Python sentiment analysis API:**
   - Navigate to `backend/sentiment/` and run:
     ```bash
     python3 app.py
     ```
   - This will start the sentiment analysis service on `http://localhost:5000`.

## Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vue.js development server:**
   ```bash
   npm run serve
   ```

4. **Access the application:**
   - Visit `http://localhost:8080` in your browser to interact with the app.

## Usage

1. **Create a new journal entry:**
   - Go to the dashboard and enter a title and content for your entry.
   - Submit the form to save the entry and trigger sentiment analysis.

2. **View past entries:**
   - All entries are displayed on the dashboard, showing the title, content, and sentiment feedback.

3. **Analyze sentiment:**
   - Sentiment analysis is run automatically when a new entry is created or can be triggered independently via a designated route.

4. **Update or delete entries:**
   - Click on an entry to edit or delete it directly from the dashboard.

## API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Endpoints

- **POST** `/journal`
  - Description: Create a new journal entry with sentiment analysis.
  - Request Body: `{ "title": "Title", "content": "Content" }`
  - Response: `{ "message": "Journal entry created successfully", "sentiment": "positive" }`

- **GET** `/journal`
  - Description: Get all journal entries.
  - Response: `[ { "id": 1, "title": "Title", "content": "Content", "sentiment": "positive" } ]`

- **GET** `/journal/:id`
  - Description: Get a specific journal entry by ID.
  - Response: `{ "id": 1, "title": "Title", "content": "Content", "sentiment": "positive" }`

- **PUT** `/journal/:id`
  - Description: Update a journal entry by ID.
  - Request Body: `{ "title": "Updated Title", "content": "Updated Content" }`
  - Response: `{ "message": "Journal entry updated successfully" }`

- **DELETE** `/journal/:id`
  - Description: Delete a journal entry by ID.
  - Response: `{ "message": "Journal entry deleted successfully" }`

## Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.
```


