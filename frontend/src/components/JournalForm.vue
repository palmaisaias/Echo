<template>
    <div class="journal-form">
      <h2>Create a New Journal Entry</h2>
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="title" required />
        </div>
        <div>
          <label for="content">Content:</label>
          <textarea id="content" v-model="content" required></textarea>
        </div>
        <button type="submit">Add Entry</button>
      </form>
      <div v-if="sentiment">
        <h3>Sentiment Analysis Result:</h3>
        <p>{{ sentiment }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: '',
        content: '',
        sentiment: null
      };
    },
    methods: {
      async handleSubmit() {
        try {
          // Create the journal entry
          const response = await axios.post('http://localhost:3000/api/journal', {
            title: this.title,
            content: this.content
          });
          console.log('Form submitted:', response.data);
  
          // Call the sentiment analysis API
          const sentimentResponse = await axios.post('http://localhost:3000/api/journal/analyze', {
            content: this.content
          });
          this.sentiment = sentimentResponse.data.sentiment;
  
          // Clear the form fields after submission
          this.title = '';
          this.content = '';
          this.$emit('entry-added'); // Emit an event to indicate a new entry was added
        } catch (error) {
          console.error('Error submitting form or analyzing sentiment:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .journal-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  form div {
    margin-bottom: 15px;
  }
  </style>
  