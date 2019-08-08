<template>
  <div class="home">
    <ul>
      <li><router-link :to="{ name: 'panel1' }">Panel1</router-link></li>
      <li><router-link :to="{ name: 'panel2' }">Panel2</router-link></li>
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
    </ul>
    {{ test }}
    <button @click="test = test + 1">Increment</button>
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
    <portal to="header">
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
  test: number = 1
  panels = [
    { routeName: 'panel1', label: 'Panel1', icon: 'mdi-phone' },
    { routeName: 'panel2', label: 'Panel2', icon: 'mdi-phone' },
  ]

  get panel() {
    return this.$route.meta.panel || 'panel1'
  }
}
</script>
