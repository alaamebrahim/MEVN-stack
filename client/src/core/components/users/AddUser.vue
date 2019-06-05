<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form>
          <b-form-group
            id="usernameLabel"
            :lable="$t('users.username')"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="form.username"
              type="text"
              required
              :placeholder="$t('users.username')"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="emailLabel"
            :lable="$t('users.email')"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              required
              :placeholder="$t('users.email')"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="roleIdLabel"
            :label="$t('users.roles')"
            label-for="roleId"
          >
            <b-form-select v-model="form.roleId">
              <option :value="null" disabled selected>
                {{ $t("general.select_option") }}
              </option>
              <option
                v-for="role in roles"
                v-bind:key="role.id"
                :value="role.id"
              >
                {{ role.name }}
              </option>
            </b-form-select>
          </b-form-group>
          <b-form-group
            id="isActiveLabel"
            :label="$t('users.status')"
            label-for="isActive"
          >
            <b-form-select v-model="form.isActive">
              <option :value="null" disabled selected>
                {{ $t("general.select_option") }}
              </option>
              <option :value="1">
                {{ $t("users.active") }}
              </option>
              <option :value="0">
                {{ $t("users.not_active") }}
              </option>
            </b-form-select>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UserService from "@/core/services/UserService";

@Component({
  components: {},
  props: ["submit"]
})
export default class AddUser extends Vue {
  userService: UserService;
  roles: any[] = [];
  form = {
    username: "",
    email: "",
    roleId: "",
    isActive: ""
  };

  constructor() {
    super();
    this.userService = new UserService();
  }

  created() {
    this.getAllRoles();
  }

  /**
   * Watch submission of new user form parent
   *
   * */
  @Watch("submit")
  onSubmitClicked() {
    //TODO find a better way to perform this operation or just make adding new user in a new route/component.
    if (this.$props.submit > 0) {
      this.addNewUser();
    }
  }

  /**
   * Add a new user operation
   * including frontend validation process
   * */
  addNewUser() {}

  /**
   * Get all roles from database
   * For select dropdown menu
   */
  getAllRoles() {
    const me = this;
    this.userService.getRoles().then(res => {
      if (res.success) {
        me.roles = res.data;
      }
    });
  }
}
</script>

<style scoped lang="scss"></style>
