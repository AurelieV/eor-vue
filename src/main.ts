import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueDateFns from 'vue-date-fns'
import { rtdbPlugin } from 'vuefire'

// import "./registerServiceWorker";
import PortalVue from 'portal-vue'
import { AuthenticatePlugin } from '@/plugins/authentication'
import { auth } from './firebase'
import { authenticateSettings, authenticateUrl } from '@/config'
import { userFilter, userListFilter } from './filters/user.filter'

Vue.use(rtdbPlugin)
Vue.use(VueDateFns)
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
Vue.filter('userList', userListFilter)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
