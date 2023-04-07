import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import http from '@/api/index'
import Toast from "vue-toastification"
import "vue-toastification/dist/index.css"
import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast, {})
app.mount('#app')

let token = JSON.parse( localStorage.getItem('token') );
if( token ){
    http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}