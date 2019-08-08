import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Panel1 from './components/panels/Panel1.vue'
import Panel2 from './components/panels/Panel2.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
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
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
})
