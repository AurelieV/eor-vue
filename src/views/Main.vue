<template>
  <v-app id="app">
    <v-app-bar app clipped-left clipped-right color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="navigationPanel = !navigationPanel"
        :disabled="isHeaderDisabled"
      >
        <v-icon>{{ menuIcon }}</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>Toolbar</v-toolbar-title>
      <v-spacer></v-spacer>
      <portal-target
        name="header"
        :slot-props="{
          isHeaderDisabled: isHeaderDisabled,
          isRightPanelAlwaysOpen: isRightPanelAlwaysOpen,
        }"
      ></portal-target>
    </v-app-bar>
    <v-navigation-drawer
      v-model="navigationPanel"
      app
      clipped
      left
      disable-route-watcher
      disable-resize-watcher
      touchless
      temporary
      :width="navigationPanelWidth"
      mobile-break-point="0"
    >
      <v-btn
        class="close-panel-btn"
        text
        icon
        color="secondary"
        @click.stop="navigationPanel = false"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Purple Fox
          </v-list-item-title>
          <v-list-item-subtitle>
            <template v-if="user">
              Connected as {{ user | user }}
            </template>
            <template v-else
              >Your are not connected</template
            >
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-list dense nav>
        <v-list-item
          v-for="(router, name) in navigationLinks"
          @click.stop="navigationPanel = false"
          :key="name"
          v-bind="router"
        >
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item link @click.stop="logout()">
          <v-list-item-content>
            <v-list-item-title color="secondary">Logout</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content v-show="!navigationPanel">
      <v-container fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-navigation-drawer
      :value="isRightPanelOpen"
      app
      clipped
      right
      stateless
      disable-route-watcher
      disable-resize-watcher
      touchless
      :width="rightPanelWidth"
      mobile-break-point="0"
    >
      <v-btn
        class="close-panel-btn"
        text
        icon
        color="secondary"
        v-if="!isRightPanelAlwaysOpen"
        @click="closeRightPanel()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <portal-target
        name="rightPanel"
        :slot-props="{
          isRightPanelAlwaysOpen: isRightPanelAlwaysOpen,
        }"
      ></portal-target>
    </v-navigation-drawer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Main extends Vue {
  navigationPanel: boolean = false
  navigationLinks = {
    Homepage: { to: '/' },
    About: { to: '/about' },
  }

  get menuIcon() {
    return this.navigationPanel ? 'mdi-close' : 'mdi-menu'
  }

  get navigationPanelWidth() {
    return this.$vuetify.breakpoint.xsOnly ? '100vw' : '256px'
  }

  get isRightPanelAlwaysOpen() {
    return this.$vuetify.breakpoint.mdAndUp
  }

  get rightPanelWidth() {
    return this.isRightPanelAlwaysOpen ? '33vw' : '100vw'
  }

  get isRightPanelOpen() {
    if (this.isRightPanelAlwaysOpen) {
      return Boolean(this.$route.meta.panel) || this.$route.meta.withPanel
    }
    return Boolean(this.$route.meta.panel)
  }

  get isHeaderDisabled() {
    return !this.isRightPanelAlwaysOpen && this.isRightPanelOpen
  }

  get user() {
    return this.$store.state.auth.user
  }

  closeRightPanel() {
    this.$router.back()
  }

  async logout() {
    try {
      await this.$auth.logout()
      this.navigationPanel = false
      this.$router.push({ name: 'login' })
    } catch (err) {
      console.log('err', err) // TODO notifications
    }
  }
}
</script>

<style lang="scss" scoped>
.close-panel-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
}
</style>
