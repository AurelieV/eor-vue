<template>
  <v-app id="login">
    <div class="container">
      <section class="card">
        <div class="header primary">
          <div class="picture">
            <img src="@/assets/fox.svg" />
          </div>
        </div>
        <div class="content">
          <div class="title secondary--text">Welcome to PurpleFox app</div>
          <div class="body">
            <p>For security reason, PurpleFox needs to know who you are</p>
            <p>
              We will use your <strong class="secondary--text">JudgeApps</strong> account for
              identify you throw the app, and also grant you access based on information it
              provides.
            </p>

            <div class="actions">
              <v-btn color="primary" type="submit" :loading="isLoading">
                Sure, connect me !
              </v-btn>
            </div>
          </div>
        </div>
      </section>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Login extends Vue {
  isLoading: boolean = false
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @include responsive-block('md') {
    min-height: 100vh;
  }
  padding: 0;
}
.card {
  width: 100%;
  @include responsive-block('md') {
    width: 400px;
    background: white;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
  }
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  .picture {
    background-color: white;
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  @include responsive-block('md') {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
}

.content {
  padding: 1em;
  .title {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    margin-top: 1em;
    margin-bottom: 2em;
  }
  .body {
    p:not(:first-child) {
      margin-top: 1.5em;
    }
    strong {
      font-weight: bold;
    }
    .actions {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
