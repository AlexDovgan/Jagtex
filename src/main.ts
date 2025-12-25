import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueFire } from "vuefire";
import {firebaseApp} from './firebase'
import 'vuetify/styles' 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' 
import App from './App.vue'
import router from './router'

const app = createApp(App)
const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
  components,
  directives
} )

app
    .use(createPinia())
    .use(router)
    .use(VueFire, { firebaseApp })
    .use(vuetify)
    .mount('#app')

