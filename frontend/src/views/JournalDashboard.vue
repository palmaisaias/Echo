<template>
  <div class="journal-dashboard">
    <div class="header">
      <h1 class="dashboard-title">Your Personal Journal</h1>
      <JournalForm @entry-added="fetchEntries" />
    </div>

    <div v-if="entries.length > 0" class="entries-container">
      <h2 class="entries-heading">Your Journal Entries</h2>
      <div class="entries-grid">
        <div v-for="entry in entries" :key="entry.id" class="journal-card">
          <div class="card shadow-lg">
            <div class="card-body journal-entry-body">
              <JournalEntry :entry="entry" />
            </div>
            <div class="card-footer text-muted sentiment-wrapper">
              <span :class="getSentimentClass(entry.sentiment)">
                {{ entry.sentiment }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="no-entries-message">
      <p>No journal entries yet. Add one above!</p>
    </div>
  </div>
</template>

<script>
import JournalForm from "../components/JournalForm.vue";
import JournalEntry from "../components/JournalEntry.vue";
import axios from "axios";
import "../assets/journal-dashboard.css";

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
        case "positive":
          return positiveResponses[
            Math.floor(Math.random() * positiveResponses.length)
          ];
        case "negative":
          return negativeResponses[
            Math.floor(Math.random() * negativeResponses.length)
          ];
        default:
          return neutralResponses[
            Math.floor(Math.random() * neutralResponses.length)
          ];
      }
    },
  },
};
</script>
