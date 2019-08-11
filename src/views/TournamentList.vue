<template>
  <v-list tile subheader>
    <v-list-item
      v-for="tournament in tournaments"
      :key="tournament.key"
      link
      :to="{ name: 'tournament', params: { tournamentKey: tournament['.key'] } }"
    >
      <v-list-item-content>
        <v-list-item-title class="primary--text text-truncate title font-weight-bold">{{
          tournament.name
        }}</v-list-item-title>
        <v-list-item-subtitle>
          <div>
            <span class="secondary--text subtitle2 font-weight-medium">Last day: </span
            ><span>{{ tournament.endDate | date('DD MMMM YYYY') }}</span>
          </div>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <div>
            <span class="secondary--text subtitle2 font-weight-medium">Admins: </span
            ><span>{{
              staffs[tournament['.key']] && staffs[tournament['.key']].admins | userList
            }}</span>
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Tournament } from '@/models'
import { User } from '@/plugins/authentication'

@Component({})
export default class Main extends Vue {
  get tournaments() {
    return this.$store.state.tournaments
  }
  get userFilter() {
    if (!(this.$options && this.$options.filters)) {
      return (t: User) => t
    } else {
      return this.$options.filters.user
    }
  }
  get staffs() {
    return this.$store.state.staffs
  }
}
</script>

<style lang="scss" scoped></style>
