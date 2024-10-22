<template>
  <div class="home-container">
    <section class="hero-section">
      <div class="hero-text">
        <h1>Welcome to Echo Mental Health Journal</h1>
        <p>Track your thoughts, analyze your emotions, and grow towards a more mindful you.</p>
        <router-link class="cta-button" to="/dashboard">Go to Journal Dashboard</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

.home-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #83a4d4, #b6fbff);
  font-family: 'Nunito', sans-serif;
}

.hero-section {
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.hero-text h1 {
  font-size: 3em;
  margin-bottom: 20px;
  color: #333;
}

.hero-text p {
  font-size: 1.5em;
  color: #555;
  margin-bottom: 30px;
}

.cta-button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 15px 30px;
  text-decoration: none;
  font-size: 1.2em;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #45a049;
}
</style>
