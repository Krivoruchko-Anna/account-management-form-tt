import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

import {
    NButton,
    NForm,
    NInput,
    NSelect,
    NConfigProvider,
    NSpace,
    NFlex,
    NIcon
} from 'naive-ui'

const app = createApp(App)

app.use(createPinia())

app.component('NButton', NButton)
app.component('NForm', NForm)
app.component('NInput', NInput)
app.component('NSelect', NSelect)
app.component('NConfigProvider', NConfigProvider)
app.component('NSpace', NSpace)
app.component('NFlex', NFlex)
app.component('NIcon', NIcon)

app.mount('#app')
