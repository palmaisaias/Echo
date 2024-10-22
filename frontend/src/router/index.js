import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import JournalDashboard from '../views/JournalDashboard.vue';
import JournalEntryView from '../views/JournalEntryView.vue'; // Import the new view

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/dashboard', name: 'JournalDashboard', component: JournalDashboard },
  // Add the dynamic route for individual journal entry view
  { path: '/entry/:id', name: 'JournalEntryView', component: JournalEntryView, props: true },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
