<template>
  <div id="app">
    <div id="nav">
      <router-link v-if="$store.state.users.status.isLogged" to="/"
        >Home
      </router-link>
      <router-link v-if="$store.state.users.status.isLogged" to="/login">
        | Logout
      </router-link>
    </div>
    <router-view />
    <notifications position="top center" />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/vars";
body {
  color: $primary;
  background: $fourth;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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

.vue-notification {
  padding: 10px;
  margin: 5px;

  font-size: 12px;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06;
  }

  &.error {
    background: green;
    border-left-color: #b82e24;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f;
  }
}
</style>
