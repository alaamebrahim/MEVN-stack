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
          v-model="userModal"
          slot="modal-footer"
          id="add_new_user_modal"
          scrollable
          :title="$t('users.add_new')"
          :hide-footer="true"
          @hide="preventDefault"
        >
          <AddUser />
        </b-modal>
      </b-col>
    </b-row>
    <Table :fields="fields" :data="users" />
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import UserService from "@/core/services/UserService";
import Table from "@/core/components/common/Table.vue";
import AddUser from "@/core/components/users/AddUser.vue";
import { mapState } from "vuex";

@Component({
  components: { AddUser, Table },
  props: ["items"],
  computed: mapState({
    userSaved: (state: any) => state.userSaved
  })
})
export default class ViewUsers extends Vue {
  users: any = [];
  userModal = false;
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

  /**
   * Lifecycle hook
   */
  mounted(): void {
    const vm = this;
    this.userModal = false;
    this.$store.watch(
      (state, getters) => getters.getSaveStatus,
      (newValue, oldValue) => {
        this.userModal = !newValue;
      }
    );
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
    else this.getAllUsers();
  }
}
</script>

<style scoped lang="scss"></style>
