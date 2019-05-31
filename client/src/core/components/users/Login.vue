<template>
  <div class="login">
    <h1 class="page-title">Welcome to {{ appConfig.appTitle }}</h1>
    <div class="container login-container">
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
                class="form-control username"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                id="password"
                v-model="password"
                name="password"
                class="form-control password"
              />
            </div>
            <button
              v-if="$store.getters.getLoginTriesCount < 3"
              type="submit"
              class="btn btn-primary m-2 text-center submit"
            >
              LOGIN
            </button>
          </form>
        </div>
        <span
          class="alert alert-danger"
          v-if="$store.getters.getLoginTriesCount >= 3"
          >You have to wait {{ $store.state.users.blockedSeconds }} second(s)
          before trying again.</span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UserService from "@/core/services/UserService";
import appConfig from "@/core/config/app.config";
@Component({})
export default class Login extends Vue {
  username: string = "";
  password: string = "";
  userService: UserService;
  appConfig: any;

  constructor() {
    super();
    this.appConfig = appConfig;
    this.userService = new UserService();
    this.$store.dispatch("setUserNotLogged", null);
    if (
      localStorage.getItem("LoginTries") &&
      localStorage.getItem("LoginTries") !== null
    ) {
      this.$store.dispatch("setLoginTries", localStorage.getItem("LoginTries"));
    }
    // console.log(this.$store.getters.)
  }

  /**
   * Perform login process
   */
  doLogin() {
    const login = { user: this.username, password: this.password };
    this.userService.postLogin(login).then(res => {
      if (res.success === false) {
        this.$store.dispatch("setUserNotLogged", res.user);
        this.$store.dispatch("setLoginTries", 1);
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

<style scoped lang="scss">
@import "../../../assets/scss/vars";
.page-title {
  background: $accent;
  max-width: 360px;
  margin: 0 auto;
  border-radius: 30px 30px 0 0;
  font-size: 1.6rem;
  padding: 1rem 0.3rem;
  @media (max-width: 369px) {
    max-width: 300px;
  }
}
.login-container {
  max-width: 360px;
  max-height: 360px;
  background: $primary;
  padding: 1rem;
  border-radius: 0 0 30px 30px;
  position: relative;

  @media (max-width: 369px) {
    max-width: 300px;
  }
  label {
    width: 100%;
    text-transform: uppercase;
    text-align: center;
    font-style: italic;
    font-weight: bold;
    font-size: 0.85rem;
    color: $accent;
  }
  .username,
  .password {
    border-radius: 0 0 10px 10px;
    color: $fourth;
    font-family: tahoma, Arial, sans-serif;
    font-size: 1.2rem;
    text-align: left;
    text-indent: 1rem;
  }

  .submit {
    background: $accent;
    border: 0;
    padding: 0.4rem 3rem;
    color: $primary;
    font-size: 1.15rem;
    font-weight: bold;
    width: 90%;

    &:hover {
      background: $secondary;
      color: $fourth;
    }
  }
}
</style>
