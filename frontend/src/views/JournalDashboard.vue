<template>
  <div class="journal-dashboard">
    <h1>Journal Dashboard</h1>
    <JournalForm @entry-added="fetchEntries" />
    <div v-if="entries.length > 0">
      <h2>Your Journal Entries</h2>
      <div v-for="entry in entries" :key="entry.id" class="entry-container">
        <!-- Wrap the JournalEntry and sentiment together inside one box -->
        <div class="entry-content">
          <JournalEntry :entry="entry" />
          <div class="sentiment-wrapper">
            <span :class="getSentimentClass(entry.sentiment)">
              {{ entry.sentiment }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No journal entries yet. Add one above!</p>
    </div>
  </div>
</template>

<script>
import JournalForm from "../components/JournalForm.vue";
import JournalEntry from "../components/JournalEntry.vue";
import axios from "axios";

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
        const response = await axios.get("http://localhost:3000/api/journal");
        this.entries = response.data;
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    },
    getSentimentClass(sentiment) {
      switch (sentiment) {
        case "positive":
          return "sentiment-positive";
        case "negative":
          return "sentiment-negative";
        default:
          return "sentiment-neutral";
      }
    },
  },
};
</script>

<style>
.journal-dashboard {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.entry-container {
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.entry-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures sentiment stays at the bottom */
  padding: 16px;
}

.sentiment-wrapper {
  text-align: right; /* Adjust as needed */
  margin-top: 8px; /* Add space between the content and sentiment */
}

.sentiment-positive {
  color: green;
}

.sentiment-negative {
  color: red;
}

.sentiment-neutral {
  color: gray;
}
</style>
