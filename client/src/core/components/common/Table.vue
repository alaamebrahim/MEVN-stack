<template>
  <b-container>
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input
              v-model="filter"
              :placeholder="$t('users.type_to_search')"
            ></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">{{
                $t("buttons.clear")
              }}</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null"
                >-- {{ $t("users.none") }} --</option
              >
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">{{ $t("users.asc") }}</option>
              <option :value="true">{{ $t("users.desc") }}</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
          <b-form-select v-model="sortDirection">
            <option value="asc">{{ $t("users.asc") }}</option>
            <option value="desc">{{ $t("users.desc") }}</option>
            <option value="last">{{ $t("users.last") }}</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select
            v-model="perPage"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-table
          responsive
          striped
          hover
          selectable
          :select-mode="selectMode"
          selectedVariant="success"
          @row-selected="setSelectedRows"
          :items="data"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
          :small="true"
          :bordered="true"
          :borderless="true"
        >
          <template slot="controls">
            <b-button-group class="float-right">
              <b-button variant="success" size="sm">{{
                $t("buttons.update")
              }}</b-button>
              <b-button variant="danger" size="sm">{{
                $t("buttons.delete")
              }}</b-button>
            </b-button-group>
          </template>
          <template slot="isActive" slot-scope="data">
            {{ data.value == 1 ? "Active" : "Inactive" }}
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UserService from "@/core/services/UserService";

@Component({
  props: ["fields", "data"]
})
export default class Table extends Vue {
  users: any = [];
  selectMode = "multi";
  selectedItems: any[] = [];
  totalRows = 1;
  currentPage = 1;
  perPage = 5;
  pageOptions = [5, 10, 15];
  sortBy = null;
  sortDesc = false;
  sortDirection = "asc";
  filter = null;
  userService: UserService;
  sortOptions: any[] = [];

  constructor() {
    super();
    const me = this;
    this.userService = new UserService();
  }

  created() {
    this.setSortOptions();
  }

  mounted() {
    this.totalRows = this.users.length;
  }

  setSelectedRows(items: any[]) {
    this.selectedItems = items.map(user => user.id);
    console.log(this.selectedItems);
  }

  setSortOptions() {
    // Create an options list from our fields
    this.sortOptions = this.$props.fields
      .filter((f: any) => f.sortable)
      .map((f: any) => {
        return { text: f.label, value: f.key };
      });
  }

  onFiltered(filteredItems: any) {
    // Trigger pagination to update the number of buttons/pages due to filtering
    this.totalRows = filteredItems.length;
    this.currentPage = 1;
  }
}
</script>

<style scoped lang="scss"></style>
