import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// import "./registerServiceWorker";
import PortalVue from 'portal-vue'
import { AuthenticatePlugin } from '@/plugins/authentication'
import { auth } from './firebase'
import { authenticateSettings, authenticateUrl } from '@/config'
import userFilter from './filters/user.filter'

Vue.use(PortalVue)
Vue.use(AuthenticatePlugin, {
  auth,
  authenticateSettings,
  authenticateUrl,
  store,
  router,
})

Vue.config.productionTip = false

// Filters
Vue.filter('user', userFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
