<template>
  <div>
    <div class="d-flex">
      <h1 class="mt-2">ข้อมูลพนักงาน</h1>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <!-- Search -->
      <v-text-field
        v-model="search"
        prepend-icon="mdi-magnify"
        label="รหัสพนักงาน"
        single-line
        hide-details
        class="mb-4"
      ></v-text-field>
      <v-btn class="my-auto ml-3" text v-on:click="searchCar">ค้นหา</v-btn>
    </div>
    <v-divider class="mt-3"></v-divider>

    <div class="mt-6">
      <v-card class="rounded-xl" height="200">
        <v-card-title class="mx-5 pt-6"> นาย วิชัย เจริญสงค์ </v-card-title>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmpInfo',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },

  data() {
    return {
      search: '',
    }
  },
}
</script>
<style lang="scss"></style>
