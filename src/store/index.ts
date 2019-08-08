import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firebaseAction } from 'vuexfire'
import { db } from '@/db'

Vue.use(Vuex)

export const INIT_DATA = 'Initialize database'
export const SELECT_TOURNAMENT = 'Select tournament'

export interface RootState {
  tournaments: Array<any>
  selectedTournament: any
  zones: Array<any>
}
export default new Vuex.Store<RootState>({
  state: {
    tournaments: [],
    selectedTournament: null,
    zones: [],
  },
  mutations: {
    setSelected(state, tournament) {
      state.selectedTournament = tournament
    },
    ...vuexfireMutations,
  },
  actions: {
    [INIT_DATA]: firebaseAction(({ bindFirebaseRef }) => {
      return bindFirebaseRef('tournaments', db.ref('tournaments'))
    }),
    [SELECT_TOURNAMENT]: firebaseAction(({ bindFirebaseRef, commit }, tournament) => {
      commit('setSelected', tournament)
      return bindFirebaseRef('zones', db.ref(`zoneTables/${tournament['.key']}`))
    }),
  },
})
