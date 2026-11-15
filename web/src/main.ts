import '@fontsource/kantumruy-pro/index.css';
import '@fontsource/kantumruy-pro/500.css';
import '@fontsource/kantumruy-pro/600.css';
import '@fontsource/kantumruy-pro/700.css';
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
