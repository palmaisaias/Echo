<template>
    <div class="journal-dashboard">
      <h1>Journal Dashboard</h1>
      <JournalForm @entry-added="fetchEntries" />
      <div v-if="entries.length > 0">
        <h2>Your Journal Entries</h2>
        <div v-for="entry in entries" :key="entry.id">
          <JournalEntry :entry="entry" />
        </div>
      </div>
      <div v-else>
        <p>No journal entries yet. Add one above!</p>
      </div>
    </div>
  </template>
  
  <script>
  import JournalForm from '../components/JournalForm.vue';
  import JournalEntry from '../components/JournalEntry.vue';
  import axios from 'axios';
  
  export default {
    components: {
      JournalForm,
      JournalEntry,
    },
    data() {
      return {
        entries: [],
      };
    },
    created() {
      this.fetchEntries();
    },
    methods: {
      async fetchEntries() {
        try {
          const response = await axios.get('http://localhost:3000/api/journal');
          this.entries = response.data;
        } catch (error) {
          console.error('Error fetching journal entries:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .journal-dashboard {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  </style>
  