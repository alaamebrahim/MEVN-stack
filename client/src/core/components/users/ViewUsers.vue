<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button-group class="float-left mb-3">
          <b-button variant="success" v-b-modal.add_new_user_modal>
            <i class="fa fa-people"></i> {{ $t("buttons.add") }}
          </b-button>
        </b-button-group>
        <b-modal
          :busy="true"
          id="add_new_user_modal"
          scrollable
          :title="$t('users.add_new')"
          @ok="addNewUser"
        >
          <AddUser />
        </b-modal>
      </b-col>
    </b-row>
    <Table :fields="fields" :data="users" />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/core/services/UserService";
import HelloWorld from "@/core/components/HelloWorld.vue";
import Table from "@/core/components/common/Table.vue";
import AddUser from "@/core/components/users/AddUser.vue";

@Component({
  components: { AddUser, Table, HelloWorld },
  props: ["items"]
})
export default class ViewUsers extends Vue {
  users: any = [];
  fields = [
    {
      key: "id",
      sortable: true,
      label: "#"
    },
    {
      key: "name",
      sortable: true,
      label: "Name"
    },
    {
      key: "email",
      sortable: false,
      label: "Email"
    },
    {
      key: "isActive",
      sortable: false,
      label: "Status"
    },
    {
      key: "controls",
      sortable: false,
      label: "Controls"
    }
  ];
  userService: UserService;

  constructor() {
    super();
    this.userService = new UserService();
  }

  created() {
    this.getAllUsers();
  }

  getAllUsers() {
    const me = this;
    this.userService.getUsers().then(res => {
      if (res.success) {
        me.users = res.data;
      }
    });
  }

  addNewUser(bvModalEvt: any) {
    bvModalEvt.preventDefault();
  }
}
</script>

<style scoped lang="scss"></style>
