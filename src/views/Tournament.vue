<template>
  <div class="tournament">
    <portal to="rightPanel">
      <template slot-scope="locales">
        <v-tabs
          v-if="locales.isRightPanelAlwaysOpen"
          value="panel"
          background-color="secondary"
          class="elevation-2"
          dark
          grow
          centered
          align-with-title
          icons-and-text
          mobile-break-point="0"
        >
          <v-tab
            v-for="(panel, index) in panels"
            :to="{ name: panel.routeName }"
            :replace="true"
            :key="index"
          >
            {{ panel.label }}
            <v-icon>{{ panel.icon }}</v-icon>
          </v-tab>
        </v-tabs>
        <div class="panel-content">
          <router-view name="panel" />
        </div>
      </template>
    </portal>
    <portal to="header-actions">
      <template slot-scope="locales">
        <v-btn small text :disabled="locales.isHeaderDisabled" :to="{ name: 'clock-actions' }">
          {{ clock }}
        </v-btn>
        <v-btn icon tile :disabled="locales.isHeaderDisabled" color="white" @click="toggleDetails">
          <v-icon>{{ isDetailsDisplayed ? 'mdi-view-comfy' : 'mdi-view-sequential' }}</v-icon>
        </v-btn>
        <template v-if="!locales.isRightPanelAlwaysOpen">
          <v-btn
            v-for="(panel, index) in panels"
            :key="index"
            icon
            :to="{ name: panel.routeName }"
            :disabled="locales.isHeaderDisabled"
            color="white"
            tile
          >
            <v-icon>{{ panel.icon }}</v-icon>
          </v-btn>
        </template>
      </template>
    </portal>
    <portal to="header">
      <span class="hidden-sm-and-down">{{ tournament && tournament.name }}</span>
    </portal>
    <portal to="nav-title">{{ tournament && tournament.name }}</portal>
    <Overview></Overview>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { db } from '@/firebase'
import { TOGGLE_IS_DETAILS_DISPLAYED, SELECT_TOURNAMENT, DESELECT_TOURNAMENT } from '@/store'
import Overview from '@/components/Overview.vue'
import { differenceInMinutes, differenceInSeconds, isBefore } from 'date-fns'

@Component({
  components: {
    Overview,
  },
})
export default class Tournament extends Vue {
  clockListener: number | null = null
  clock: String = '50:00'

  mounted() {
    if (this.$vuetify.breakpoint.mdAndUp && this.$route.name === 'tournament') {
      this.$router.replace({ name: 'actions' })
    }
  }

  get panels() {
    return [
      { routeName: 'chat', label: 'Chat', icon: 'mdi-forum' },
      {
        routeName: 'filters',
        label: 'Filters',
        icon: this.hasActiveFilter ? 'mdi-filter' : 'mdi-filter-outline',
      },
      {
        routeName: 'actions',
        label: 'Actions',
        icon: 'mdi-dots-vertical',
      },
    ]
  }

  get hasActiveFilter() {
    return false
  }

  get isDetailsDisplayed() {
    return this.$store.state.ui.isDetailsDisplayed
  }

  get panel() {
    return this.$route.meta.panel || 'panel1'
  }

  get tournament() {
    return this.$store.state.tournament
  }

  get endTime() {
    return this.$store.state.endTime
  }

  @Watch('$route.params.tournamentKey', { immediate: true })
  fetchTournament(key: string) {
    if (key) {
      this.$store.dispatch(SELECT_TOURNAMENT, key)
    } else {
      this.$store.dispatch(DESELECT_TOURNAMENT, key)
    }
  }

  @Watch('endTime', { immediate: true })
  animateClock(endTime: number | null) {
    if (this.clockListener && !this.endTime) {
      window.clearInterval(this.clockListener)
      this.clock = '50:00'
      this.clockListener = null
    }
    if (this.endTime && !this.clockListener) {
      this.clockListener = window.setInterval(this.updateClock.bind(this), 1000)
    }
  }

  updateClock() {
    if (!this.endTime) {
      this.clock = '50:00'
      return
    }
    const now = new Date()
    const end = new Date(this.endTime)
    if (isBefore(now, end)) {
      const diff = differenceInSeconds(end, now)
      const seconds = diff % 60
      const minutes = Math.floor(diff / 60)
      this.clock = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    } else {
      const diff = differenceInSeconds(now, end)
      const seconds = diff % 60
      const minutes = Math.floor(diff / 60)
      this.clock = `-${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    }
  }

  toggleDetails() {
    this.$store.commit(TOGGLE_IS_DETAILS_DISPLAYED)
  }

  destroyed() {
    this.$store.dispatch(DESELECT_TOURNAMENT)
    if (this.clockListener) {
      window.clearInterval(this.clockListener)
    }
  }
}
</script>

<style lang="scss">
.panel-content {
  padding: 1rem;
}
</style>
