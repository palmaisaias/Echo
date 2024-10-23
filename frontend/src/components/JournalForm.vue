<template>
  <div class="journal-form">
    <div class="header-container text-center mb-5">
      <h2 class="form-title display-4">Reflect and Write</h2>
      <p class="text-muted">"Every thought penned down is a step towards clarity."</p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="form-container border-0 p-5 rounded-lg shadow-soft">
      <div class="mb-4">
        <label for="title" class="form-label">Title:</label>
        <input
          type="text"
          id="title"
          v-model="title"
          class="form-control form-input border-0 rounded-pill p-3 shadow-sm"
          placeholder="Give your entry a title..." 
          required
        />
      </div>
      <div class="mb-4">
        <label for="content" class="form-label">Content:</label>
        <textarea
          id="content"
          v-model="content"
          class="form-control form-textarea border-0 rounded-lg p-4 shadow-sm"
          placeholder="What's on your mind today?" 
          rows="6"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn w-100 submit-btn-form btn-lg rounded-pill p-3 shadow">Capture moment...</button>
    </form>

    <div v-if="sentiment" class="mt-5 sentiment-result text-center">
      <h3 class="text-secondary">Sentiment Analysis Result:</h3>
      <div class="alert alert-info border-0 shadow-soft p-4 mt-3 rounded-lg">
        <p class="fs-5">{{ sentimentMessage }}</p>
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
