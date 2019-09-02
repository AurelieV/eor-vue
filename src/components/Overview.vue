<template>
  <div class="overview">
    <v-card class="overview-zone">
      <div class="overview-header primary--text">
        <span class="name">Zone 1</span>
        <span class="sections"> (1-100/200-300)</span>
      </div>
      <div class="overview-content">
        <div class="counters">
          <div class="counter">
            <v-icon>mdi-alarm</v-icon>
            <div class="count">
              50(+10min)
            </div>
          </div>
          <div class="counter">
            <v-icon>mdi-monitor-off</v-icon>
            <div class="count">4</div>
          </div>
        </div>
        <div class="summary secondary--text">
          <div class="count">150</div>
          <div>still</div>
          <div>playing</div>
        </div>
      </div>
    </v-card>
    <v-card class="overview-zone">
      <div class="overview-header primary--text">
        <span class="name">Zone 1</span>
        <span class="sections"> (1-100/200-300)</span>
      </div>
      <div class="overview-content">
        <div class="counters">
          <div class="counter">
            <v-icon>mdi-alarm</v-icon>
            <div class="count">
              50(+10min)
            </div>
          </div>
          <div class="counter">
            <v-icon>mdi-monitor-off</v-icon>
            <div class="count">4</div>
          </div>
        </div>
        <div class="summary secondary--text">
          <div class="count">150</div>
          <div>still</div>
          <div>playing</div>
        </div>
      </div>
    </v-card>
    <v-card class="overview-zone">
      <div class="overview-header primary--text">
        <span class="name">Zone 1</span>
        <span class="sections"> (1-100/200-300)</span>
      </div>
      <div class="overview-content">
        <div class="counters">
          <div class="counter">
            <v-icon>mdi-alarm</v-icon>
            <div class="count">
              50(+10min)
            </div>
          </div>
          <div class="counter">
            <v-icon>mdi-monitor-off</v-icon>
            <div class="count">4</div>
          </div>
        </div>
        <div class="summary secondary--text">
          <div class="count">150</div>
          <div>still</div>
          <div>playing</div>
        </div>
      </div>
    </v-card>
    <v-card class="overview-zone">
      <div class="overview-header primary--text">
        <span class="name">Zone 1</span>
        <span class="sections"> (1-100/200-300)</span>
      </div>
      <div class="overview-content">
        <div class="counters">
          <div class="counter">
            <v-icon>mdi-alarm</v-icon>
            <div class="count">
              50(+10min)
            </div>
          </div>
          <div class="counter">
            <v-icon>mdi-monitor-off</v-icon>
            <div class="count">4</div>
          </div>
        </div>
        <div class="summary secondary--text">
          <div class="count">150</div>
          <div>still</div>
          <div>playing</div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Overview extends Vue {}
</script>

<style lang="scss" scoped>
.overview {
  display: inline-flex;
  width: 100%;
  overflow-y: auto;
  padding: 0.5rem 0;
  &-zone {
    padding: 1rem;
    box-sizing: border-box;
    flex-shrink: 0;
    @include responsive(
      'width',
      (
        xs: 80%,
        sm: 45%,
        md: 40%,
        lg: 30%,
      )
    );
    margin-left: 1%;
    margin-right: 1%;
    cursor: pointer;
  }
  &-header {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 1rem;
    .name {
      font-weight: bold;
    }
  }
  &-content {
    display: flex;
    margin-top: 5px;
    align-items: center;
    .summary {
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 1;
      font-size: 1rem;
      .count {
        font-size: 1.8rem;
        font-weight: bold;
      }
      :not(.count) {
        font-size: 0.8rem;
      }
    }
    .counters {
      flex: 1 0 auto;
    }
    .counter {
      margin-top: 5px;
      display: flex;
      align-items: center;
      .count {
        flex: 1 0 auto;
        margin-left: 5px;
      }
    }
  }
}
</style>
