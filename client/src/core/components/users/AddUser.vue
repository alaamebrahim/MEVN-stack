<template>
  <b-container>
    <b-row>
      <b-col>
        <b-form @submit="onSubmit">
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
            <b-dropdown
              id="roleId"
              v-model="form.roleId"
              required
              :text="$t('users.roles')"
            >
              <b-dropdown-item v-for="role in roles" v-bind:key="role.id">{{
                role.name
              }}</b-dropdown-item>
            </b-dropdown>
          </b-form-group>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/core/services/UserService";
import HelloWorld from "@/core/components/HelloWorld.vue";
import Table from "@/core/components/common/Table.vue";

@Component({
  components: { Table, HelloWorld },
  props: ["items"]
})
export default class AddUser extends Vue {
  userService: UserService;
  roles: any[] = [];
  form = {
    username: ""
  };

  constructor() {
    super();
    this.userService = new UserService();
  }

  created() {
    this.getAllRoles();
  }

  addNewUser() {}

  onSubmit() {}

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
