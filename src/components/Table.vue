<template>
  <div class="table" :class="status">
    {{ id }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { INIT_DATA, SELECT_TOURNAMENT } from '@/store'

@Component
export default class HelloWorld extends Vue {
  @Prop({ required: true }) id!: string
  @Prop({ required: true }) status!: string
}
</script>

<style scoped lang="scss">
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
