<template>
  <div>
    <div class="d-flex">
      <h1 class="mt-2">เอกสารลางาน</h1>
      <v-spacer></v-spacer>
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
      <v-btn class="my-auto ml-3" text v-on:click="search">ค้นหา</v-btn>
    </div>
    <v-divider class="mt-3"></v-divider>

    <div>
      <v-row class="mt-2">
        <v-col cols="5">
          <p class="mx-12">อนุมัติแล้ว</p>
          <v-card class="rounded-xl" height="320">
            <approveTable class="pa-2" />
          </v-card>
          <p class="mt-6 mx-12">ปฏิเสธแล้ว</p>
          <v-card class="rounded-xl mt-3" height="320">
            <denyTable class="pa-2" />
          </v-card>
        </v-col>
        <v-col cols="7">
          <p class="mx-12">เอกสารการลาทั้งหมด</p>
          <v-card class="rounded-xl pa-2" height="700">
            <allTable />
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import approveTable from '~/components/HR/LeaveDoc/approveTable.vue'
import denyTable from '~/components/HR/LeaveDoc/denyTable.vue'
import allTable from '~/components/HR/LeaveDoc/allDocTable.vue'
export default {
  components: { denyTable, approveTable, allTable },
  name: 'LeaveWork',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
    store.dispatch('Auth/setAdminTrue')
  },

  data() {
    return {
      search: '',
    }
  },
}
</script>
<style lang="scss"></style>
