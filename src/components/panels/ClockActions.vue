<template>
  <div>
    <h2 class="title primary--text">Clock</h2>
    <v-container>
      <v-form v-model="form">
        <v-row align-content="stretch">
          <v-col cols="4">
            <v-text-field
              v-model.number="minutes"
              type="number"
              label="Minutes"
              outlined
              required
              :rules="minutesRules"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="seconds"
              type="number"
              label="Seconds"
              outlined
              required
              :rules="secondesRules"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn color="primary" class="action-button" @click="start" :disabled="!form"
              >Start</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
      <v-row dense>
        <v-col cols="10" offset="1">
          <v-btn class="mb-2" color="secondary" block @click="reset">Reset</v-btn>
        </v-col>
        <v-col cols="10" offset="1">
          <v-btn color="secondary" exact outlined block @click="cancel">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from 'vue-property-decorator'

@Component
export default class Actions extends Vue {
  minutes: number = 50
  seconds: number = 0
  form = true
  minutesRules = [v => v >= 0 || `You must defined a positive value`]
  secondesRules = [
    v => v >= 0 || `You must defined a positive value`,
    v => v < 60 || `Value must be under 60`,
  ]

  cancel() {
    return this.$router.back()
  }

  reset() {
    //TODO: call store
  }

  start() {
    //TODO call store
  }
}
</script>

<style lang="scss" scoped>
.action-button {
  margin-top: 10px;
}
</style>
