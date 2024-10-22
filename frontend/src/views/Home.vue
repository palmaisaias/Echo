<template>
  <div>
    <nav class="home-navbar">
      <div class="nav-container-home">
        <router-link class="nav-logo-home" to="/">
          <img src="/echoLOG.png" alt="Echo Journal Logo" />
        </router-link>
        <ul class="nav-menu-home">
          <li class="nav-item">
            <router-link class="nav-links-home" to="/">home</router-link>
          </li>
          <li class="nav-item-home">
            <router-link class="nav-links-home" to="/about">about Us</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links-home" to="/features">features</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-links-home" to="/contact">contact</router-link>
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
import "../assets/home.css";

export default {
  name: 'HomePage',
  mounted() {
    AOS.init();
  }
};
</script>

