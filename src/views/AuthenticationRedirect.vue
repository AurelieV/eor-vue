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
    <Notifications />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import Notifications from '@/components/Notifications.vue'
import { PUSH_NOTIFICATION } from '@/store'

@Component({
  components: {
    Notifications,
  },
})
export default class AuthenticationRedirect extends Vue {
  @Watch('$route.query.code', { immediate: true })
  async handleCode(code: string) {
    try {
      await this.$auth.processJudgeAppsToken(code)
      this.$store.dispatch(PUSH_NOTIFICATION, {
        message: 'Authentification successfull',
        type: 'success',
      })
      this.$router.push({ name: 'main' })
    } catch (err) {
      this.$store.dispatch(PUSH_NOTIFICATION, { message: 'Authentification failed', type: 'error' })
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="scss" scoped></style>
