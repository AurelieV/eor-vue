<template>
  <div class="hello">
    <ul v-for="tournament in tournaments" :key="tournament['.key']">
      <li @click="selectTournament(tournament)">{{ tournament.name }}</li>
    </ul>
    <div class="tables" v-if="tables">
      <Table v-for="(table, index) in tables" :key="index" :status="table.status" :id="table.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Table from '@/components/Table.vue'

@Component({
  components: { Table },
})
export default class HelloWorld extends Vue {
  get tournaments() {
    return this.$store.state.tournaments
  }

  get tables() {
    const zones = this.$store.state.zones
    return ((zones && zones[0] && zones[0][0]) || []).filter((t: any) => Boolean(t))
  }

  get nbPlaying() {
    return this.tables.filter((t: any) => t.status === 'done').length
  }
}
</script>

<style scoped lang="scss">
.tables {
  display: flex;
  flex-wrap: wrap;
}
.table {
  height: 20px;
  width: 20px;
  &.done {
    background: green;
  }
  &.covered {
    background: orange;
  }
  &.playing {
    background: red;
  }
}
</style>
