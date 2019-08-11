import _Vue, { PluginObject } from 'vue'
import { Store } from 'vuex'
import * as Oidc from 'oidc-client'
import axios from 'axios'
import 'firebase/auth'
import { firebaseAction } from 'vuexfire'
import { db } from '@/firebase'
import VueRouter from 'vue-router'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: {
      logout(): Promise<any>
      loginWithJudgeApps(): void
      processJudgeAppsToken(code: string): Promise<any>
    }
  }
}

export const AuthenticatePlugin: PluginObject<AuthenticatePluginOptions> = {
  install(Vue: typeof _Vue, options?: AuthenticatePluginOptions) {
    if (!options) return
    const { auth, authenticateSettings, authenticateUrl, store, router } = options
    Vue.prototype.$auth = {
      async logout() {
        await auth.signOut()
      },

      loginWithJudgeApps() {
        const client = new Oidc.UserManager(authenticateSettings)
        client.signinRedirect()
      },

      async processJudgeAppsToken(code: string) {
        const { data } = await axios.post(authenticateUrl, { code })
        await auth.signInWithCustomToken(data.token)
        // TODO: check if really we are sure store is up to date after this
      },
    }

    store.registerModule<UserState>('auth', {
      namespaced: true,
      state: {
        uid: undefined,
        user: undefined,
        roles: {},
      },
      mutations: {
        updateFirebaseUser(state, uid) {
          state.uid = uid
        },
        resetUser(state) {
          state.uid = null
          state.user = null
          state.roles = {}
        },
      },
      actions: {
        updateUser: firebaseAction(async function(
          { bindFirebaseRef, commit, unbindFirebaseRef },
          user
        ) {
          if (user) {
            commit('updateFirebaseUser', user.uid)
            await Promise.all([
              bindFirebaseRef('user', db.ref(`users/${user.uid}/judgeapps`)),
              bindFirebaseRef('roles', db.ref(`users/${user.uid}/roles`)),
            ])
          } else {
            unbindFirebaseRef('user')
            unbindFirebaseRef('roles')
            commit('resetUser')
          }
        }),
      },
      getters: {
        isConnected(state) {
          return Boolean(state.uid)
        },
      },
    })
    auth.onAuthStateChanged(user => {
      store.dispatch('auth/updateUser', user)
    })

    const authInitialized = new Promise(resolve => {
      const unsubscribe = store.watch(
        state => state.auth.uid,
        () => {
          resolve()
          unsubscribe()
        }
      )
    })

    router.beforeEach((to, from, next) => {
      if (to.matched.some(r => r.meta.auth)) {
        authInitialized.then(() => {
          if (store.state.auth.uid) {
            next()
          } else {
            next({ name: 'login' })
          }
          next()
        })
      } else {
        next()
      }
    })
  },
}

export interface UserState {
  uid: string | undefined | null
  user: User | undefined | null
  roles: { [key: string]: boolean }
}
export interface AuthenticationSettings {
  authority: string
  client_id: string
  redirect_uri: string
  post_logout_redirect_uri: string
  response_type: string
  scope: string
}
export interface AuthenticatePluginOptions {
  auth: firebase.auth.Auth
  authenticateSettings: AuthenticationSettings
  authenticateUrl: string
  store: Store<any>
  router: VueRouter
}

export interface User {
  name: string
  given_name: string
  family_name: string
  nickname: string
  preferred_username: string
  level: number
  dci_number: number
  region: string
  picture: string
  id: string
}
