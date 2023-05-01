import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/main.css'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
});

// new Vue({
//   render: h=>h(App),
//   store:store,
//   router:router,
//   created(){
//     //this.$store.dispatch('verifyToken',{auth_token:this.$cookies.get('auth_token')});
//   }
// }).$mount('#app');

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(store);
app.mount('#app')
