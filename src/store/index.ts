import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { db } from '@/firebase'
import { TournamentStaff, Tournament } from '@/models'
import { getTime, addMinutes, addSeconds } from 'date-fns'

Vue.use(Vuex)

export const START_SYNCHRO = 'Start synchro'
export const STOP_SYNCHRO = 'Stop synchro'
export const SELECT_TOURNAMENT = 'Select tournament'
export const ADD_NOTIFICATION = 'Add notification action'
export const REMOVE_NOTIFICATION = 'Remove notification'
export const PUSH_NOTIFICATION = 'Push notification'
export const TOGGLE_IS_DETAILS_DISPLAYED = 'Toggle show details'
export const DESELECT_TOURNAMENT = 'Deselect tournament'
export const START_CLOCK = 'Start clock'
export const RESTART_CLOCK = 'Restart clock'

export interface Notification {
  message: string
  type: string
  id: number
}
export interface RootState {
  tournaments: Array<any>
  tournament: Tournament | null
  zones: Array<any>
  staffs: { [key: string]: TournamentStaff }
  notifications: Notification[]
  notificationId: number
  endTime: number | null
  ui: {
    isDetailsDisplayed: boolean
  }
}
export default new Vuex.Store<RootState>({
  state: {
    tournaments: [],
    tournament: null,
    zones: [],
    staffs: {},
    notifications: [],
    notificationId: 0,
    endTime: 0,
    ui: {
      isDetailsDisplayed: false,
    },
  },
  mutations: {
    reset(state) {
      state.tournaments = []
      state.staffs = {}
    },
    resetTournament(state) {
      state.tournament = null
      state.endTime = null
      state.zones = []
    },
    ...vuexfireMutations,
    [REMOVE_NOTIFICATION](state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id)
    },
    [ADD_NOTIFICATION](state, notif) {
      state.notifications.push({ ...notif, id: state.notificationId })
      state.notificationId = state.notificationId + 1
    },
    [TOGGLE_IS_DETAILS_DISPLAYED](state) {
      state.ui.isDetailsDisplayed = !state.ui.isDetailsDisplayed
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
    [SELECT_TOURNAMENT]: firebaseAction(async ({ bindFirebaseRef }, key) => {
      await Promise.all([
        bindFirebaseRef('tournament', db.ref(`tournaments/${key}`)),
        bindFirebaseRef('zones', db.ref(`zoneTables/${key}`)),
        bindFirebaseRef('endTime', db.ref(`endTime/${key}`), {
          serialize(snapshot) {
            return snapshot.val()
          },
        }),
      ])
    }),
    [DESELECT_TOURNAMENT]: firebaseAction(async ({ unbindFirebaseRef, commit }) => {
      await Promise.all([
        unbindFirebaseRef('tournament'),
        unbindFirebaseRef('zones'),
        unbindFirebaseRef('endTime'),
      ])
      commit('resetTournament')
    }),
    async [START_CLOCK]({ state }, { minutes = 50, seconds = 0 } = {}) {
      if (!state.tournament) return
      const key = state.tournament['.key']
      const time = getTime(addSeconds(addMinutes(new Date(), minutes), seconds))
      await db.ref(`endTime/${key}`).set(time)
    },
    async [RESTART_CLOCK]({ state }) {
      if (!state.tournament) return
      const key = state.tournament['.key']
      await db.ref(`endTime/${key}`).remove()
    },
    async [PUSH_NOTIFICATION]({ commit, state }, notif) {
      const notifId = state.notificationId
      commit(ADD_NOTIFICATION, notif)
      setTimeout(() => {
        commit(REMOVE_NOTIFICATION, notifId)
      }, 2000)
    },
  },
})
