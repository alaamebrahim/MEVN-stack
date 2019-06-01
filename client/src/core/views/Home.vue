<template>
  <div>
    <Navbar />
    <b-container>
      <b-row>
        <b-col cols="2">
          <Sidebar />
        </b-col>
        <b-col>
          <router-view />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/core/components/HelloWorld.vue";
import Sidebar from "./layout/Sidebar.vue";
import Navbar from "./layout/Navbar.vue";

@Component({
  components: {
    Sidebar,
    Navbar
  }
})
export default class Home extends Vue {}
</script>
