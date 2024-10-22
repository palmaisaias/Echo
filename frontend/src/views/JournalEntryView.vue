<template>
    <div class="entry-view-container">
      <h1 class="entry-title">Journal Entry Details</h1>
      <div v-if="entry" class="entry-details">
        <h2>{{ entry.title }}</h2>
        <p>{{ entry.content }}</p>
        <p class="entry-date">Date: {{ formatDate(entry.date) }}</p>
        <p :class="getSentimentClass(entry.sentiment)">
          Sentiment: {{ getSentimentMessage(entry.sentiment) }}
        </p>
      </div>
      <div v-else class="loading-message">
        <p>Loading entry...</p>
      </div>
      <router-link to="/dashboard" class="back-button">Back to Dashboard</router-link>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'JournalEntryView',
    props: ['id'],
    data() {
      return {
        entry: null,
      };
    },
    created() {
      this.fetchEntry();
    },
    methods: {
      async fetchEntry() {
        try {
          const response = await axios.get(`http://localhost:3000/api/journal/${this.id}`);
          this.entry = response.data;
        } catch (error) {
          console.error('Error fetching entry:', error);
        }
      },
      formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString(undefined, options);
      },
      getSentimentMessage(sentiment) {
        const positiveResponses = [
          "Feeling great today!",
          "A positive outlook!",
          "You're on a roll!",
          "Good vibes only!",
          "Keep up the positivity!",
        ];
  
        const negativeResponses = [
          "It's okay to have tough days.",
          "Hang in there.",
          "This too shall pass.",
          "Take it easy on yourself.",
          "Remember, better days are ahead.",
        ];
  
        const neutralResponses = [
          "Feeling balanced.",
          "A calm moment.",
          "Taking it one step at a time.",
          "A reflective moment.",
          "Neither high nor low—just right.",
        ];
  
        switch (sentiment) {
          case 'positive':
            return positiveResponses[
              Math.floor(Math.random() * positiveResponses.length)
            ];
          case 'negative':
            return negativeResponses[
              Math.floor(Math.random() * negativeResponses.length)
            ];
          default:
            return neutralResponses[
              Math.floor(Math.random() * neutralResponses.length)
            ];
        }
      },
      getSentimentClass(sentiment) {
        return sentiment === 'positive'
          ? 'text-success'
          : sentiment === 'negative'
          ? 'text-danger'
          : 'text-secondary';
      },
    },
  };
  </script>
  
  <style scoped>
  .entry-view-container {
    padding: 20px;
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
  }
  
  .entry-title {
    margin-bottom: 20px;
  }
  
  .entry-details {
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .entry-date {
    margin-top: 10px;
    font-size: 14px;
    color: #888;
  }
  
  .text-success {
    color: #4caf50;
  }
  
  .text-danger {
    color: #f44336;
  }
  
  .text-secondary {
    color: #9e9e9e;
  }
  
  .back-button {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3b82f6;
    color: white;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .back-button:hover {
    background-color: #2563eb;
  }
  </style>
  