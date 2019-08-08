<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import '@/styles/reset.scss'

@Component
export default class App extends Vue {}
</script>
