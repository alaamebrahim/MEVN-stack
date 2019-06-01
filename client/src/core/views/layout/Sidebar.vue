<template>
  <div>test</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import appConfig from "@/core/config/app.config";
import LoginService from "@/core/services/LoginService";

@Component
export default class Sidebar extends Vue {
  appConfig: any;
  userLogged = false;

  constructor() {
    super();
    this.appConfig = appConfig;
  }

  checkUserLoggedIn() {
    if (
      this.$store.state.users.status.isLogged === true ||
      LoginService.isAuthenticated()
    ) {
      this.userLogged = true;
    }
  }
}
</script>

<style lang="scss"></style>
