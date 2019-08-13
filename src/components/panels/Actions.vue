<template>
  <div>
    <component v-if="$route.meta.modal" :is="$route.meta.modal"></component>
    <div v-else>Actions</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Actions extends Vue {}
</script>
