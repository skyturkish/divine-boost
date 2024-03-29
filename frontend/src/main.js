/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'
import Banner from '@/components/Banner'
import GamesMenu from '@/components/menus/GamesMenu'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.component('Banner', Banner)
app.component('GamesMenu', GamesMenu)

registerPlugins(app)

app.mount('#app')
