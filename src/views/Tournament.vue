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
        <template v-if="!locales.isRightPanelAlwaysOpen">
          <v-btn
            v-for="(panel, index) in panels"
            :key="index"
            icon
            :to="{ name: panel.routeName }"
            :disabled="locales.isHeaderDisabled"
            color="white"
          >
            <v-icon>{{ panel.icon }}</v-icon>
          </v-btn>
        </template>
      </template>
    </portal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Tournament extends Vue {
  panels = [
    { routeName: 'panel1', label: 'Panel1', icon: 'mdi-phone' },
    { routeName: 'panel2', label: 'Panel2', icon: 'mdi-phone' },
  ]

  get panel() {
    return this.$route.meta.panel || 'panel1'
  }
}
</script>
