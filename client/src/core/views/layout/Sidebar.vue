<template>
  <div>test</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import appConfig from "@/core/config/app.config";
import UserService from "@/core/services/UserService";

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
      UserService.isAuthenticated()
    ) {
      this.userLogged = true;
    }
  }
}
</script>

<style lang="scss"></style>
