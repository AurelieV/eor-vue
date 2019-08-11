import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Tournament from './views/Tournament.vue'
import TournamentList from './views/TournamentList.vue'
import Actions from './components/panels/Actions.vue'
import Chat from './components/panels/Chat.vue'
import Filters from './components/panels/Filters.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Main,
      meta: {
        auth: true,
      },
      children: [
        {
          path: '/',
          name: 'main',
          component: TournamentList,
        },
        {
          path: '/tournament/:tournamentKey',
          name: 'tournament',
          component: Tournament,
          meta: {
            withPanel: true,
          },
          children: [
            {
              path: 'actions',
              name: 'actions',
              components: {
                panel: Actions,
              },
              meta: {
                panel: 'actions',
              },
            },
            {
              path: 'chat',
              name: 'chat',
              components: {
                panel: Chat,
              },
              meta: {
                panel: 'chat',
              },
            },
            {
              path: 'filters',
              name: 'filters',
              components: {
                panel: Filters,
              },
              meta: {
                panel: 'filters',
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
    {
      path: '/authent-redirect',
      name: 'authent-redirect',
      component: () =>
        import(/* webpackChunkName: "authent-redirect" */ './views/AuthenticationRedirect.vue'),
    },
  ],
})
