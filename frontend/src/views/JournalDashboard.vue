<template>
  <div>
    <nav class="journal-navbar">
      <div class="nav-container">
        <router-link class="nav-logo-dash" to="/">
          <img src="/echoLOG.png" alt="Echo Journal Logo" />
        </router-link>
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link class="nav-links" to="/">home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links" to="/about">about us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links" to="/features">features</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links" to="/contact">contact</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="dashboard-container">
      <section class="journal-dashboard">
        <div class="header float-down-advanced">
          <!-- <h1 class="dashboard-title">Your Personal Journal</h1> -->
          <JournalForm @entry-added="fetchEntries" />
        </div>
        <!-- <div class="filter-container">
          <label for="sentiment-filter" class="filter-label"
            >Filter by Sentiment:</label
          >
          <select
            id="sentiment-filter"
            v-model="selectedSentiment"
            @change="filterEntries"
          >
            <option value="all">All</option>
            <option value="positive">Positive</option>
            <option value="neutral">Neutral</option>
            <option value="negative">Negative</option>
          </select>
        </div> -->
        <div
          class="chart-container"
          v-if="entries.length > 0"
          data-aos="zoom-in"
          data-aos-duration="1500"
        >
          <canvas id="sentimentChart"></canvas>
        </div>
        <div v-if="filteredEntries.length > 0" class="entries-container">
          <h2 class="entries-heading">Your Journal Entries</h2>
          <div class="entries-grid">
            <div
              v-for="entry in filteredEntries"
              :key="entry.id"
              class="entry-card"
            >
              <div class="card shadow-lg">
                <div class="card-body journal-entry-body">
                  <JournalEntry :entry="entry" />
                  <router-link
                    :to="`/entry/${entry.id}`"
                    class="view-entry-button"
                    >View Entry</router-link
                  >
                </div>
                <div class="card-footer text-muted sentiment-wrapper">
                  <!-- <span class="journal-entry-echocard-mood badge badge-info">Mood:</span> -->
                  <span :class="getSentimentClass(entry.sentiment)">
                    {{ getSentimentMessage(entry.sentiment) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-entries-message">
          <p>No journal entries yet. Add one above!</p>
        </div>
        <router-link class="new-entry-button" to="/new-entry"
          >Create New Entry</router-link
        >
      </section>
    </div>
  </div>
</template>

<script>
import JournalForm from "../components/JournalForm.vue";
import JournalEntry from "../components/JournalEntry.vue";
import axios from "axios";
import "../assets/journal-dashboard.css";
import Chart from "chart.js/auto";
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";

AOS.init();

export default {
  name: "JournalDashboard",
  components: {
    JournalForm,
    JournalEntry,
  },
  data() {
    return {
      entries: [],
      selectedSentiment: "all",
      filteredEntries: [],
    };
  },
  created() {
    this.fetchEntries();
  },
  mounted() {
    AOS.init({
      once: true, // Animation runs only once
    });
    const tl = gsap.timeline();

    // Animate the header entering the view with a slight bounce effect
    tl.fromTo(
      ".header",
      {
        y: -300,
        scale: 1.5,
        opacity: 0,
        rotation: -10,
      },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 2,
        ease: "back.out(1.7)", // Provides a realistic overshoot effect
      }
    );

    // Add a gentle floating motion to the header after it appears
    tl.to(
      ".header",
      {
        x: "+=10",
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1, // Makes the floating motion continuous
      },
      "-=1" // Starts this animation 1 second before the previous one ends
    );
  },
  computed: {
    // Computed property to always sort entries by ID (highest to lowest)
    sortedEntries() {
      return this.filteredEntries.sort((a, b) => b.id - a.id);
    },
  },
  methods: {
    async fetchEntries() {
      try {
        const response = await axios.get("http://localhost:3000/api/journal");

        // Sort entries by ID in descending order
        this.entries = response.data.sort((a, b) => b.id - a.id);
        this.filteredEntries = [...this.entries];

        // Wait for DOM updates before creating the chart
        this.$nextTick(() => {
          this.createSentimentChart();
        });
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    },
    filterEntries() {
      if (this.selectedSentiment === "all") {
        this.filteredEntries = [...this.entries];
      } else {
        this.filteredEntries = this.entries.filter(
          (entry) => entry.sentiment === this.selectedSentiment
        );
      }

      // Ensure the filtered entries are sorted by ID (highest to lowest)
      this.filteredEntries.sort((a, b) => b.id - a.id);
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
    getSentimentClass(sentiment) {
      return sentiment === "positive"
        ? "text-success"
        : sentiment === "negative"
        ? "text-danger"
        : "text-secondary";
    },
    createSentimentChart() {
      const sentimentCounts = {
        positive: this.entries.filter((entry) => entry.sentiment === "positive")
          .length,
        neutral: this.entries.filter((entry) => entry.sentiment === "neutral")
          .length,
        negative: this.entries.filter((entry) => entry.sentiment === "negative")
          .length,
      };

      const ctx = document.getElementById("sentimentChart").getContext("2d");
      new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Positive", "Neutral", "Negative"],
          datasets: [
            {
              data: [
                sentimentCounts.positive,
                sentimentCounts.neutral,
                sentimentCounts.negative,
              ],
              backgroundColor: ["#93C5FD", "#3B82F6", "#1E3A8A"],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    },
  },
};
</script>
