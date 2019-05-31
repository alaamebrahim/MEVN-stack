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
</style>
