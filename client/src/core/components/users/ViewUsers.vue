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
          slot="modal-footer"
          id="add_new_user_modal"
          scrollable
          :title="$t('users.add_new')"
          @hide="preventDefault"
          @ok="addNewUser"
        >
          <AddUser :submit="submit" />
          <!--          <template slot="modal-footer" slot-scope="{ close }">-->
          <!--            <span></span>-->
          <!--          </template>-->
        </b-modal>
      </b-col>
    </b-row>
    <Table :fields="fields" :data="users" />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/core/services/UserService";
import Table from "@/core/components/common/Table.vue";
import AddUser from "@/core/components/users/AddUser.vue";

@Component({
  components: { AddUser, Table },
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
  submit = 0;

  constructor() {
    super();
    this.userService = new UserService();
  }

  created() {
    this.getAllUsers();
  }

  addNewUser() {
    this.submit += 1;
  }

  getAllUsers() {
    const me = this;
    this.userService.getUsers().then(res => {
      if (res.success) {
        me.users = res.data;
      }
    });
  }

  preventDefault(bvModalEvt: any) {
    if (!["headerclose", "cancel"].includes(bvModalEvt.trigger))
      bvModalEvt.preventDefault();
    else this.submit = 0;
  }
}
</script>

<style scoped lang="scss"></style>
