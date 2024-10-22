<template>
  <div>
    <nav class="navbar">
      <div class="nav-container">
        <router-link class="nav-logo" to="/">Echo Journal</router-link>
        <ul class="nav-menu">
          <li class="nav-item">
            <router-link class="nav-links" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links" to="/about">About Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links" to="/features">Features</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links" to="/contact">Contact</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div class="home-container">
      <section class="hero-section">
        <div class="hero-text">
          <h1>Welcome to Echo Mental Health Journal</h1>
          <p>Track your thoughts, analyze your emotions, and grow towards a more mindful you.</p>
          <router-link class="cta-button" to="/dashboard">Go to Journal Dashboard</router-link>
        </div>
      </section>
      <section class="testimonials-section">
        <h2>What Our Users Are Saying</h2>
        <div class="testimonials">
          <div class="testimonial">
            <p>"Echo has helped me understand my emotions better and feel more in control of my mental health. I highly recommend it!"</p>
            <span>- Alex R.</span>
          </div>
          <div class="testimonial">
            <p>"Using Echo every day has made a huge difference in my life. It's simple, easy to use, and incredibly insightful."</p>
            <span>- Jamie L.</span>
          </div>
          <div class="testimonial">
            <p>"A wonderful tool that has helped me navigate my thoughts and feelings. Echo is like a supportive friend in my pocket."</p>
            <span>- Taylor M.</span>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');

.navbar {
  width: 100%;
  height: 60px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 10;
}

.nav-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.nav-logo {
  color: #fff;
  font-size: 1.8em;
  font-weight: bold;
  text-decoration: none;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 20px;
}

.nav-item {
  line-height: 60px;
}

.nav-links {
  color: #333;
  background: #fff;
  padding: 10px 15px;
  border-radius: 15px;
  text-decoration: none;
  font-size: 1.2em;
  transition: background-color 0.3s, color 0.3s;
}

.nav-links:hover {
  background-color: #b6fbff;
  color: #333;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(to right, #83a4d4, #b6fbff);
  font-family: 'Nunito', sans-serif;
  padding-top: 100px;
}

.hero-section {
  text-align: center;
  background: rgba(255, 255, 255, 0.8);
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 60px;
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

.testimonials-section {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 40px 20px;
}

.testimonials-section h2 {
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #333;
}

.testimonials {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.testimonial {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.testimonial p {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 10px;
}

.testimonial span {
  font-weight: bold;
  color: #333;
}
</style>
