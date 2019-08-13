<template>
  <div class="notifications">
    <v-alert
      class="notification"
      v-for="notif in notifications"
      :key="notif.id"
      :type="notif.type"
      :icon="false"
      dismissible
      dense
      transition="slide-y-transition"
      @input="close(notif.id)"
      >{{ notif.message }}</v-alert
    >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { REMOVE_NOTIFICATION } from '@/store'

@Component
export default class Notifications extends Vue {
  get notifications() {
    return this.$store.state.notifications
  }
  close(id: number) {
    this.$store.commit(REMOVE_NOTIFICATION, id)
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  position: fixed;
  top: 12px;
  left: 4px;
  right: 4px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @include responsive-block('sm') {
    align-items: center;
  }
  .notification {
    &:not(:first-child) {
      margin-top: 4px;
    }
    @include responsive-block('sm') {
      width: 400px;
    }
  }
}
</style>
