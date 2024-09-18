import { createApp } from 'vue';
import App from './App.vue';
import store from './Store';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


// Créer l'app et la monter ?? l10
const app = createApp(App);
app.use(store);
app.use(router);
app.mount('#app');
