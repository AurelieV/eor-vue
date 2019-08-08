import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Tournament from './views/Tournament.vue'
import Panel1 from './components/panels/Panel1.vue'
import Panel2 from './components/panels/Panel2.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/tournament',
          name: 'tounament',
          component: Tournament,
          meta: {
            withPanel: true,
          },
          children: [
            {
              path: '/panel1',
              name: 'panel1',
              components: {
                panel: Panel1,
              },
              meta: {
                panel: 'panel1',
              },
            },
            {
              path: '/panel2',
              name: 'panel2',
              components: {
                panel: Panel2,
              },
              meta: {
                panel: 'panel2',
              },
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './views/Login.vue'),
    },
  ],
})
