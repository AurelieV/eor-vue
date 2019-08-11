import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { db } from '@/firebase'
import { TournamentStaff } from '@/models'

Vue.use(Vuex)

export const START_SYNCHRO = 'Start synchro'
export const STOP_SYNCHRO = 'Stop synchro'
export const SELECT_TOURNAMENT = 'Select tournament'

export interface RootState {
  tournaments: Array<any>
  selectedTournament: any
  zones: Array<any>
  staffs: { [key: string]: TournamentStaff }
}
export default new Vuex.Store<RootState>({
  state: {
    tournaments: [],
    selectedTournament: null,
    zones: [],
    staffs: {},
  },
  mutations: {
    setSelected(state, tournament) {
      state.selectedTournament = tournament
    },
    reset(state) {
      state.tournaments = []
    },
    ...vuexfireMutations,
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
  },
})
