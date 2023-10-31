import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import { fr,en } from '@formkit/i18n'
import { createMultiStepPlugin } from '@formkit/addons'
import '@formkit/addons/css/multistep'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(plugin, defaultConfig({
    plugins: [createMultiStepPlugin()],
    locales: { en,fr },
    locale: 'fr',
}))
app.use(router)

app.mount('#app')
