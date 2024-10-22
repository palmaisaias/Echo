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
      // Transform entries data to match format needed for a time-based area chart
      const sentimentDates = this.entries.map((entry) => {
        return {
          date: new Date(entry.created_at), // Assuming `created_at` field exists with the date of the entry
          sentiment: entry.sentiment,
        };
      });

      // Group entries by date and calculate averages for each day
      const sentimentSummary = {};
      sentimentDates.forEach((entry) => {
        const dateKey = entry.date.toLocaleDateString("en-US");
        if (!sentimentSummary[dateKey]) {
          sentimentSummary[dateKey] = {
            positive: 0,
            neutral: 0,
            negative: 0,
            count: 0,
          };
        }
        sentimentSummary[dateKey][entry.sentiment] += 1;
        sentimentSummary[dateKey].count += 1;
      });

      const labels = Object.keys(sentimentSummary).sort(
        (a, b) => new Date(a) - new Date(b)
      );
      const averageData = labels.map((date) => {
        const { positive, neutral, negative, count } = sentimentSummary[date];
        return (positive + neutral * 0.5) / count; // Calculating an average mood score including neutral
      });

      const ctx = document.getElementById("sentimentChart").getContext("2d");

      // Preload emoji images before creating the chart
      const emojiHappy = new Image();
      const emojiNeutral = new Image();
      const emojiSad = new Image();
      emojiHappy.src = "/happy.png"; // Adjusted path to happy emoji
      emojiNeutral.src = "/neutral.png"; // Adjusted path to neutral emoji
      emojiSad.src = "/sadness.png"; // Adjusted path to sad emoji

      // Wait for images to load before drawing the chart
      const imagesLoaded = [emojiHappy, emojiNeutral, emojiSad].map(
        (img) =>
          new Promise((resolve) => {
            img.onload = resolve;
          })
      );

      Promise.all(imagesLoaded).then(() => {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "",
                data: averageData,
                borderColor: "#3B82F6",
                backgroundColor: "rgba(59, 130, 246, 0.5)",
                fill: true,
                tension: 0.4, // Make the line smoother by adding tension
              },
            ],
          },
          options: {
            responsive: true,
            layout: {
              padding: {
                top: 30, // Add padding to top to give room for emojis
                bottom: 30, // Add padding to bottom if needed
              },
            },
            plugins: {
              legend: {
                position: "null",
                labels: {},
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Date",
                  font: {
                    size: 16, // Increase font size for better readability
                  },
                },
                ticks: {
                  font: {
                    size: 14, // Increase font size for better readability
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Mood",
                  font: {
                    size: 16, // Increase font size for better readability
                  },
                },
                ticks: {
                  callback: function (value) {
                    if (value === 1) return "Winning Coffee";
                    if (value === 0.5) return "Just Here";
                    if (value === 0) return "No Chips";
                    return "";
                  },
                  font: {
                    size: 14, // Increase font size for better readability
                  },
                },
                suggestedMin: 0,
                suggestedMax: 1,
              },
            },
            animation: {
              onComplete: (chart) => {
                const ctx = chart.chart.ctx;
                const dataset = chart.chart.data.datasets[0];
                const meta = chart.chart.getDatasetMeta(0);
                meta.data.forEach((point, index) => {
                  const value = dataset.data[index];
                  let emoji;

                  // Select appropriate emoji based on sentiment value
                  if (value > 0.75) {
                    emoji = emojiHappy;
                  } else if (value > 0.25) {
                    emoji = emojiNeutral;
                  } else {
                    emoji = emojiSad;
                  }

                  // Draw emoji at the point
                  ctx.drawImage(emoji, point.x - 15, point.y - 25, 45, 45);
                });
              },
            },
          },
        });
      });
    },
  },
};
</script>
