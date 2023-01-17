<template>
  <div>
    <div class="d-flex">
      <h1 class="mt-2">สรุปผลประจำวัน</h1>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <p class="mt-7">วัน : {{ date }}</p>
    </div>
    <v-divider class="mt-3"></v-divider>

    <!-- View -->
    <div>
      <v-row class="mt-2"
      >
        <v-col cols="4">
          <v-card
            height="240"
            class="rounded-xl pa-12 white--text d-flex flex-column align-center"
            color="primary"
            nuxt
            @click=";(allEmp = true), (checkinEmp = false), (leaveEmp = false)"
          >
            <v-card-title class="display-2"> {{ CountEmp }}</v-card-title>
            <v-card-title> พนักงานทั้งหมด</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card
            height="240"
            class="rounded-xl pa-12 white--text d-flex flex-column align-center"
            color="green"
            nuxt
            @click=";(checkinEmp = true), (allEmp = false), (leaveEmp = false)"
          >
            <v-card-title class="display-2"> {{ CountCheckin }}</v-card-title>
            <v-card-title> เข้างาน</v-card-title>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card
            height="240"
            class="rounded-xl pa-12 white--text d-flex flex-column align-center"
            color="red"
            nuxt
            @click=";(leaveEmp = true), (allEmp = false), (checkinEmp = false)"
          >
            <v-card-title class="display-2"> {{ CountLeave }}</v-card-title>
            <v-card-title> ลางาน</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Table -->
    <div>
      <v-card class="rounded-xl mt-6 pa-3">
        <div v-if="allEmp">
          <allEmp :Emp="Emp"/>
        </div>
        <div v-else-if="checkinEmp">
          <checkinEmp :todayCheckin="todayCheckin"/>
        </div>
        <div v-else>
          <leaveEmp :todayLeave="todayLeave"/>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import allEmp from '~/components/HR/allEmp.vue'
import checkinEmp from '~/components/HR/checkinEmp.vue'
import leaveEmp from '~/components/HR/leaveEmp.vue'

var moment = require( 'moment' )
export default {
  name : 'Dashbord',
  async asyncData( { store, $axios } ) {
    // store.dispatch( 'Auth/setAuthTrue' )
    // store.dispatch( 'Auth/setAdminTrue' )


    const Emp = await $axios.$get( '/employee/all' )
    const CountEmp = Emp.length || 0

    const todayCheckin = await $axios.$get( '/workTime' )
    const CountCheckin = todayCheckin.length || 0

    const todayLeave = await $axios.$get( '/leaveWork/todayApproved' )
    const CountLeave = todayLeave.length || 0



    return { Emp, todayCheckin,todayLeave, CountEmp, CountCheckin,CountLeave }

  },

  components : { allEmp, checkinEmp, leaveEmp },

  data() {
    return {
      date : moment().format( 'DD-MM-YYYY' ),
      allEmp : true,
      checkinEmp : false,
      leaveEmp : false,
    }
  },
}
</script>
<style lang="scss"></style>
