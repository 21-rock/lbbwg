import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './locales'
import pinia from '@/store'
import './style/var.css'
import './style/main.scss'
import './style/ant-design-reset.scss'
import './style/ant-design-reset/index.scss'
import './style/tailwind.css'
import directives from './directives'
import '@/router/router.guard'
import 'virtual:svg-icons-register'

// const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(directives)

app.mount('#app')
