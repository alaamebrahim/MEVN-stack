<template>
  <div id="app">
    <router-view />
    <notifications position="top center" />
  </div>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component({
  components: {}
})
export default class App extends Vue {
  userLogged = false;
  constructor() {
    super();
  }
}
</script>

<style lang="scss">
@import "./assets/scss/vars";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.dark {
  background: $fourth-a;
  margin: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
