import {createApp} from 'vue'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import routes from "./config/router";
import Vant from "vant";
import 'vant/lib/index.css';


const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(Vant)
app.use(router)
app.mount('#app')