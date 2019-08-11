<template>
  <v-app>
    <v-content>
      <v-container>
        <v-layout column align-center justify-center style="height:90vh">
          <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
          ></v-progress-circular>
          <div class="mt-2 primary--text">Processing authentication ...</div>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component
export default class AuthenticationRedirect extends Vue {
  @Watch('$route.query.code', { immediate: true })
  async handleCode(code: string) {
    try {
      await this.$auth.processJudgeAppsToken(code)
      this.$router.push({ name: 'main' })
    } catch (err) {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
