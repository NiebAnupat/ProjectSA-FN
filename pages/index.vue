<template>
  <div>
    <div class="pt-16">
      <h1 class="d-flex justify-center">RSU COMPANY</h1>
    </div>
    <v-row class="align-center" style="height: 60vh">
      <v-col cols="6">
        <v-card
          class="mx-auto"
          nuxt
          to="/employee"
          elevation="6"
          width="350"
          height="350"
        >
          <div class="d-flex justify-center pa-8">
            <img height="200" src="~/assets/employees.png" />
          </div>
          <div class="d-flex justify-center">
            <v-card-title>พนักงานทั่วไป</v-card-title>
          </div>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card
          class="mx-auto"
          nuxt
          to="/HR"
          elevation="6"
          width="350"
          height="350"
        >
          <div class="d-flex justify-center pa-8">
            <img height="200" src="~/assets/hr.png" />
          </div>
          <div class="d-flex justify-center">
            <v-card-title>ฝ่ายบุคคล</v-card-title>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'index',
  layout: 'default',

  mounted() {
    setTimeout(() => {
      this.$store.dispatch('Auth/setAuthFalse')
    }, 250)
  },
}
</script>
<style lang="scss"></style>
