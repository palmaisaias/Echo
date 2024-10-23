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
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(5px);
  }
  
  .modal-content {
    background: #fff;
    padding: 30px;
    border-radius: 12px;
    max-width: 600px;
    width: 90%;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    transition: transform 0.3s ease, opacity 0.3s ease;
    transform: scale(1.05);
    opacity: 1;
  }
  
  .modal-close-button {
    background: none;
    border: none;
    font-size: 1.8rem;
    color: #333;
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    transition: color 0.3s ease;
  }
  
  .modal-close-button:hover {
    color: #ff5f5f;
  }
  
  h2 {
    font-size: 2rem;
    margin-bottom: 20px;
    color: #333;
    text-align: center;
  }
  
  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #555;
    text-align: justify;
  }
  
  @media (max-width: 768px) {
    .modal-content {
      padding: 20px;
    }
    h2 {
      font-size: 1.5rem;
    }
    p {
      font-size: 1rem;
    }
  }
  </style>
  