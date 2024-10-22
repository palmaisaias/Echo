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
      <section class="hero-section" data-aos="fade-in">
        <div class="hero-text">
          <h1>Welcome to Echo Mental Health Journal</h1>
          <p>Track your thoughts, analyze your emotions, and grow towards a more mindful you.</p>
          <router-link class="cta-button" to="/dashboard">Go to Journal Dashboard</router-link>
        </div>
      </section>
      <section class="testimonials-section" data-aos="fade-up">
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
      <section class="features-section" data-aos="fade-up">
        <h2>Features to Help You on Your Journey</h2>
        <div class="features">
          <div class="feature-card" data-aos="zoom-in">
            <i class="fas fa-pen"></i>
            <h3>Daily Journal</h3>
            <p>Capture your thoughts and emotions each day to reflect and grow.</p>
          </div>
          <div class="feature-card" data-aos="zoom-in">
            <i class="fas fa-chart-line"></i>
            <h3>Emotion Analysis</h3>
            <p>Analyze your emotions over time with insightful visualizations.</p>
          </div>
          <div class="feature-card" data-aos="zoom-in">
            <i class="fas fa-user-friends"></i>
            <h3>Community Support</h3>
            <p>Join a community of like-minded individuals for support and encouragement.</p>
          </div>
        </div>
      </section>
      <footer class="footer-section" data-aos="fade-in">
        <div class="footer-content">
          <div class="footer-logo">
            <router-link class="nav-logo" to="/">Echo Journal</router-link>
          </div>
          <div class="footer-links">
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/about">About Us</router-link></li>
              <li><router-link to="/features">Features</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>
          <div class="footer-social">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2024 Echo Mental Health Journal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';

export default {
  name: 'HomePage',
  mounted() {
    AOS.init();
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css');

.navbar {
  width: 100%;
  height: 80px;
  background-color: rgba(39, 39, 39, 0.32);
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
  background: linear-gradient(to right, rgba(131, 164, 212, 0.8), rgba(182, 251, 255, 0.8)), url('https://images.unsplash.com/photo-1507829525154-5f81f1d0f2b2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  background-size: cover;
  background-position: center;
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

.features-section {
  text-align: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 50px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 40px 20px;
}

.features-section h2 {
  font-size: 2.5em;
  margin-bottom: 30px;
  color: #333;
}

.features {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 300px;
}

.feature-card i {
  font-size: 2.5em;
  color: #4CAF50;
  margin-bottom: 15px;
}

.feature-card h3 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 15px;
}

.feature-card p {
  font-size: 1.2em;
  color: #555;
}

.footer-section {
  background: #333;
  color: #fff;
  padding: 30px 20px;
  text-align: center;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-logo {
  font-size: 1.8em;
  font-weight: bold;
  text-decoration: none;
  color: #fff;
}

.footer-links ul {
  list-style: none;
  display: flex;
  gap: 20px;
  padding: 0;
}

.footer-links a {
  color: #fff;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #b6fbff;
}

.footer-social a {
  color: #fff;
  font-size: 1.5em;
  margin: 0 10px;
  transition: color 0.3s;
}

.footer-social a:hover {
  color: #b6fbff;
}

.footer-bottom {
  margin-top: 20px;
}
</style>
