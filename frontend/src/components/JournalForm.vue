<template>
  <div class="journal-form">
    <h2 class="text-center mb-4">Create a New Journal Entry</h2>
    <form @submit.prevent="handleSubmit" class="form-container border p-4 rounded shadow-lg">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input 
          type="text" 
          id="title" 
          v-model="title" 
          class="form-control form-input" 
          placeholder="Enter the title" 
          required 
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content:</label>
        <textarea 
          id="content" 
          v-model="content" 
          class="form-control form-textarea" 
          placeholder="Write your entry here..." 
          rows="5" 
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary w-100 submit-btn">Add Entry</button>
    </form>

    <div v-if="sentiment" class="mt-4 sentiment-result">
      <h3>Sentiment Analysis Result:</h3>
      <div class="alert alert-info">
        <p>{{ sentimentMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import "../assets/journal-form.css";

export default {
  data() {
    return {
      title: '',
      content: '',
      sentiment: null,
      sentimentMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Create the journal entry in the backend
        const response = await axios.post('http://localhost:3000/api/journal', {
          title: this.title,
          content: this.content
        });
        console.log('Journal entry created:', response.data);

        // Call the sentiment analysis endpoint
        const sentimentResponse = await axios.post('http://localhost:3000/api/journal/analyze', {
          content: this.content
        });
        this.sentiment = sentimentResponse.data.sentiment;
        this.sentimentMessage = this.getSentimentMessage(this.sentiment);

        // Clear form fields
        this.title = '';
        this.content = '';
        this.$emit('entry-added'); // Notify parent component of new entry
      } catch (error) {
        console.error('Error submitting form or analyzing sentiment:', error);
      }
    },
    getSentimentMessage(sentiment) {
      const messages = {
        positive: "You seem to be in high spirits today! 😊",
        negative: "It's okay to have a rough day. Take it easy. 💙",
        neutral: "A balanced state of mind—keep reflecting! 📝"
      };
      return messages[sentiment] || "Sentiment couldn't be determined.";
    }
  }
};
</script>
