<template>
  <div class="login">
    <h1>Login</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <form method="post" @submit.prevent="doLogin">
            <div class="form-group">
              <label for="username" class="">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                v-model="username"
                class="form-control"
              />
            </div>
            <div class="form-group">
              <label for="password" class="">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                name="password"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-primary m-2 text-center">
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserService from "@/core/services/UserService";

@Component({})
export default class Login extends Vue {
  username: string = "";
  password: string = "";
  userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
    this.$store.dispatch("setUserNotLogged", null);
  }

  /**
   * Perform login process
   */
  doLogin() {
    const login = { user: this.username, password: this.password };
    this.userService.postLogin(login).then(res => {
      if (res.success === false) {
        this.$store.dispatch("setUserNotLogged", res.user);
        return false;
      }

      // Login success...
      if (res.success === true) {
        this.$store.dispatch("setUserLogged", res.user);
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push("/");
      }
    });
  }
}
</script>
