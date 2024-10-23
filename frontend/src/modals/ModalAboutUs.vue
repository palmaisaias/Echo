<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="modal-close-button" @click="closeModal">&times;</button>
        <h2>About Us</h2>
        <p>
          Echo Mental Health Journal is dedicated to helping individuals track their thoughts, analyze their emotions, and grow towards a more mindful self. Our goal is to provide a supportive space for mental health reflection and self-improvement.
        </p>
        <p>
          We believe that understanding your emotions is the first step towards positive mental health, and Echo is here to make that journey as insightful and rewarding as possible.
        </p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ModalAboutUs',
    emits: ['close'],
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .modal-close-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
  </style>
  