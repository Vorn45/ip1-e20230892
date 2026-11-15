import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setupIcons } from './plugins/icons';
import router from './router';
import App from './App.vue';
import './style.css';

setupIcons();

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

app.mount('#app');
