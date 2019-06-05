<template>
  <!--  <div id="nav">-->
  <!--    <router-link to="/">Home </router-link>-->
  <!--    <router-link to="/login">-->
  <!--      | Logout-->
  <!--    </router-link>-->
  <!--  </div>-->
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed>
      <b-navbar-brand to="/dashboard">
        <img
          alt="Vue logo"
          src="../../../assets/logo.png"
          class="img-fluid"
          width="32"
        />
        {{ appConfig.appTitle }}
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/dashboard/users">{{ $t("users.title") }}</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item
              v-for="locale in supportedLocales"
              v-bind:key="locale"
              href="#"
            >
              {{ locale }}
            </b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"
              ><em>{{ getUserName() }}</em></template
            >
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="/#/login">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import appConfig from "@/core/config/app.config";
import LoginService from "@/core/services/LoginService";

@Component
export default class Navbar extends Vue {
  appConfig: any;
  supportedLocales: Array<string> = [];
  userLogged = false;

  constructor() {
    super();
    this.appConfig = appConfig;
    this.supportedLocales = this.getSupportedLocales();
    this.checkUserLoggedIn();
  }

  getSupportedLocales(): Array<string> {
    const vm = this;
    const locales = require.context(
      "../../../locales",
      true,
      /[A-Za-z0-9-_,\s]+\.json$/i
    );
    const keys: Array<string> = [];
    locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        keys.push(locale);
      }
    });
    return keys;
  }

  checkUserLoggedIn() {
    if (LoginService.isAuthenticated()) {
      this.userLogged = true;
    }
  }

  getUserName(): string {
    return LoginService.getUserData().loggedUser.name;
  }
}
</script>

<style lang="scss">
@import "../../../assets/scss/vars";

a {
  color: $primary-a;
}
</style>
