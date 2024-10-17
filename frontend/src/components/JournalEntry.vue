<template>
  <div class="journal-entry card mb-4 shadow-sm">
    <div class="card-body">
      <h3 class="card-title">{{ entry.title }}</h3>
      <p class="card-text">{{ entry.content }}</p>
    </div>
    <div class="card-footer text-muted">
      <small>Created at: {{ formatDate(entry.created_at) }}</small>
    </div>
  </div>
</template>
  
<script>
import "../assets/journal-entry.css";  // Import the new CSS file

export default {
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(date).toLocaleDateString(undefined, options);
    }
  }
};
</script>
