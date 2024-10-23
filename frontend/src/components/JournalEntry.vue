<template>
  <div class="journal-entry-echocard mb-4 shadow-sm">
    <div class="journal-entry-echocard-body">
      <div class="journal-entry-echocard-header d-flex justify-content-between align-items-center mb-3">
        <h3 class="journal-entry-echocard-title mb-0">{{ entry.title }}</h3>
      </div>
      <div class="journal-entry-echocard-meta text-muted mb-3">
        <small>Created at: {{ formatDate(entry.created_at) }}</small>
      </div>
      <div class="journal-entry-echocard-content">
        <p>{{ entry.content }}</p>
      </div>
    </div>
    <div class="journal-entry-echocard-footer">
      <div class="journal-entry-echocard-tags mb-2">
        <span v-for="tag in entry.tags" :key="tag" class="journal-entry-echocard-tag badge badge-pill badge-secondary mr-1">#{{ tag }}</span>
      </div>
      <div class="journal-entry-echocard-actions text-right">
        <button class="journal-entry-echocard-btn btn btn-primary btn-sm mr-2">Edit</button>
        <button class="journal-entry-echocard-btn btn btn-danger btn-sm" @click="deleteEntry(entry.id)">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/journal-entry.css";  // Import the new CSS file
import axios from 'axios';

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
    },
    deleteEntry(id) {
      if (confirm('Are you sure you want to delete this entry?')) {
        axios.delete(`http://localhost:3000/api/journal/${id}`)
          .then(response => {
            this.$emit('entryDeleted', id);
            alert(response.data.message);
            window.location.reload();
          })
          .catch(error => {
            console.error('There was an error deleting the entry:', error);
            alert('Failed to delete the journal entry.');
          });
      }
    }
  }
};
</script>
