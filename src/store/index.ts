import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { db } from '@/firebase'
import { TournamentStaff } from '@/models'

Vue.use(Vuex)

export const START_SYNCHRO = 'Start synchro'
export const STOP_SYNCHRO = 'Stop synchro'
export const SELECT_TOURNAMENT = 'Select tournament'
export const ADD_NOTIFICATION = 'Add notification action'
export const REMOVE_NOTIFICATION = 'Remove notification'
export const PUSH_NOTIFICATION = 'Push notification'

export interface Notification {
  message: string
  type: string
  id: number
}
export interface RootState {
  tournaments: Array<any>
  selectedTournament: any
  zones: Array<any>
  staffs: { [key: string]: TournamentStaff }
  notifications: Notification[]
  notificationId: number
}
export default new Vuex.Store<RootState>({
  state: {
    tournaments: [],
    selectedTournament: null,
    zones: [],
    staffs: {},
    notifications: [],
    notificationId: 0,
  },
  mutations: {
    setSelected(state, tournament) {
      state.selectedTournament = tournament
    },
    reset(state) {
      state.tournaments = []
    },
    ...vuexfireMutations,
    [REMOVE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id)
    },
    [ADD_NOTIFICATION](state, notif) {
      state.notifications.push({ ...notif, id: state.notificationId })
      state.notificationId = state.notificationId + 1
    },
  },
  actions: {
    [START_SYNCHRO]: firebaseAction(async ({ bindFirebaseRef }) => {
      await Promise.all([
        bindFirebaseRef('tournaments', db.ref('tournaments')),
        bindFirebaseRef('staffs', db.ref('staff')),
      ])
    }),
    [STOP_SYNCHRO]: firebaseAction(async function({ unbindFirebaseRef, commit }) {
      await Promise.all([unbindFirebaseRef('tournaments'), unbindFirebaseRef('staffs')])
      commit('reset')
    }),
    [SELECT_TOURNAMENT]: firebaseAction(({ bindFirebaseRef, commit }, tournament) => {
      commit('setSelected', tournament)
      return bindFirebaseRef('zones', db.ref(`zoneTables/${tournament['.key']}`))
    }),
    async [PUSH_NOTIFICATION]({ commit, state }, notif) {
      const notifId = state.notificationId
      commit(ADD_NOTIFICATION, notif)
      setTimeout(() => {
        commit(REMOVE_NOTIFICATION, notifId)
      }, 2000)
    },
  },
})
