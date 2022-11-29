<template>
  <div>
    <div>
      <h1 class="mt-2">เอกสารลางาน</h1>
    </div>
    <v-divider class="mt-3"></v-divider>

    <div>
      <v-row class="mt-2">
        <v-col cols="5">
          <v-card class="green lighten-4 rounded-xl" height="310">
            <v-card-title> ใบลาที่อนุมัติแล้ว </v-card-title>
          </v-card>
          <v-card class="red lighten-4 rounded-xl mt-6" height="310">
            <v-card-title> ใบลาที่ปฎิเสธแล้ว </v-card-title>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card class="rounded-xl" height="645">
            <v-card-title> ใบลาในระบบทั้งหมด </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaveWork',
  async asyncData({ store }) {
    store.dispatch('Auth/setAdminTrue')
  },
}
</script>
<style lang="scss"></style>
