import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import JournalDashboard from '../views/JournalDashboard.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'JournalDashboard', component: JournalDashboard }
];

const router = createRouter({
  history: createWebHistory('/'),  // Replace process.env.BASE_URL with '/'
  routes,
});

export default router;
