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
        <router-view name="panel" />
      </template>
    </portal>
    <portal to="header-actions">
      <template slot-scope="locales">
        <v-btn flat small text>
          50:00
        </v-btn>
        <v-btn icon tile :disabled="locales.isHeaderDisabled" color="white">
          <v-icon>{{ isDetailsDisplayed ? 'mdi-view-sequential' : 'mdi-view-comfy' }}</v-icon>
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
      <span class="hidden-sm-and-down">{{ tournament.name }}</span>
    </portal>
    <portal to="nav-title" v-if="tournament">{{ tournament.name }}</portal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { db } from '@/firebase'

@Component({})
export default class Tournament extends Vue {
  tournament: Tournament | {} = {}

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
    return false
  }

  get panel() {
    return this.$route.meta.panel || 'panel1'
  }

  @Watch('$route.params.tournamentKey', { immediate: true })
  fetchTournament(key: string) {
    //TODO: move this to store
    this.$rtdbBind('tournament', db.ref('tournaments').child(key))
  }
}
</script>
