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
        :rules="searchRules"
        single-line
        class="mb-4"
        @keydown.enter="searchLeave"
      ></v-text-field>
<!--      <v-btn class="my-auto ml-3" :disabled="search.length !== 7" text v-on:click="searchLeave">ค้นหา</v-btn>-->
    </div>
    <v-divider class="mt-3"></v-divider>

    <div>
      <v-row class="mt-2">
        <v-col cols="5">
          <p class="mx-12">อนุมัติแล้ว</p>
          <v-card class="rounded-xl" height="320">
            <approveTable class="pa-2" :getDetail='getDetail' :approveDoc="approveDoc" />
          </v-card>
          <p class="mt-6 mx-12">ปฏิเสธแล้ว</p>
          <v-card class="rounded-xl mt-3" height="320">
            <denyTable class="pa-2" :getDetail='getDetail' :denyDoc="denyDoc" />
          </v-card>
        </v-col>
        <v-col cols="7">
          <p class="mx-12">เอกสารการลาทั้งหมด</p>
          <v-card class="rounded-xl pa-2" height="700">
            <allTable :getDetail='getDetail' :leaveDoc="leaveDoc" :refreshData="refreshData"/>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- dialog -->
    <div>
      <v-dialog
        v-model="dialog"
        scrollable
        :overlay="false"
        max-width="700"
        transition="dialog-transition"
      >
        <v-card max-height="550">
          <v-card-title> รายละเอียดการลางาน</v-card-title>
          <v-card-text>
            <!-- Leave Date -->
            <v-row cols="12">
              <v-col md="6">
                <v-text-field
                  v-model="leaveDetail.fromDate"
                  label="วันที่ต้องการลา"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="leaveDetail.toDate"
                  label="ถึงวันที่"
                  prepend-icon="mdi-calendar"
                  readonly
                ></v-text-field>
              </v-col>
            </v-row>


            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="leaveDetail.type"
                  label="ประเภทการลา"
                  readonly
                ></v-text-field>

              </v-col>
              <!-- Document -->
              <v-col cols="6">
                <v-file-input
                  v-model="leaveDetail.Img"
                  label="เอกสารแนบ"
                  prepend-icon="mdi-paperclip"
                  accept="image/*"
                  show-size
                  color="primary"
                  disabled
                ></v-file-input>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
              <v-sheet>
                <div v-if="leaveDetail.Img != null">
                  <img
                    :src="this.convertBlobToURL(leaveDetail.Img)"
                    width="450"
                  />
                </div>
                <div v-else>ไม่พบเอกสาร</div>
              </v-sheet>
            </v-row>

            <!-- Text -->
            <v-row class="mt-10">
              <v-col cols="12">
                <v-textarea
                  v-model="leaveDetail.doc"
                  label="หมายเหตุ"
                  placeholder="ระบุเหตุผลการลางาน"
                  outlined
                  readonly
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>

  </div>
</template>

<script>
import approveTable from '~/components/HR/LeaveDoc/approveTable.vue'
import denyTable from '~/components/HR/LeaveDoc/denyTable.vue'
import allTable from '~/components/HR/LeaveDoc/allDocTable.vue'

const moment = require( 'moment' )
export default {
  components : { denyTable, approveTable, allTable },
  name : 'LeaveWork',
  async asyncData( { store, $axios } ) {
    // store.dispatch( 'Auth/setAuthTrue' )
    // store.dispatch( 'Auth/setAdminTrue' )

    const leaveDoc = await $axios.$get( '/leaveWork/pending' )
    const approveDoc = await $axios.$get( '/leaveWork/approved' )
    const denyDoc = await $axios.$get( '/leaveWork/rejected' )
    return { leaveDoc, approveDoc, denyDoc }

  },

  data() {
    return {
      dialog : false,
      search : '',
      searchRules : [
        ( v ) => v.length === 7 || 'กรุณากรอกรหัสพนักงาน 7 หลัก',
        ( v ) => !isNaN( v ) || 'กรุณากรอกเป็นตัวเลขเท่านั้น'],

      fromDatePicker : false,
      toDatePicker : false,

      leaveDetail : {
        fromDate : '',
        toDate : '',
        type : '',
        doc : '',
        Img : null,
      }
    }
  },

  methods : {

    getDetail( item ) {
      this.dialog = true
      this.leaveDetail = {
        fromDate : moment( item.L_DATE_START ).format( 'DD/MM/YYYY' ),
        toDate : moment( item.L_DATE_END ).format( 'DD/MM/YYYY' ),
        type : item.leave_type.LY_NAME,
        doc : item.L_NOTE,
        Img : item.L_IMAGE,
      }
    },

    async searchLeave() {
      const leaveWork = await this.$axios.$get( '/leaveWork/by/' + this.search )
      if ( leaveWork.length === 0 ) {
        this.$swal( {
          type : 'warning',
          title : 'ไม่พบข้อมูล',
          text : 'กรุณากรอกรหัสพนักงานให้ถูกต้อง หรือ ไม่มีข้อมูลการลางาน',
        } )
        this.search = ''
        await this.refreshData()
      } else {
        const pending = leaveWork.filter( ( item ) => item.L_STATUS === 'p' )
        const approved = leaveWork.filter( ( item ) => item.L_STATUS === 't' )
        const rejected = leaveWork.filter( ( item ) => item.L_STATUS === 'f' )
        this.leaveDoc = pending
        this.approveDoc = approved
        this.denyDoc = rejected
      }

    },

    async refreshData() {
      console.log( 'refresh' )
      const leaveDoc = await this.$axios.$get( '/leaveWork/pending' )
      const approveDoc = await this.$axios.$get( '/leaveWork/approved' )
      const denyDoc = await this.$axios.$get( '/leaveWork/rejected' )
      this.leaveDoc = leaveDoc
      this.approveDoc = approveDoc
      this.denyDoc = denyDoc
    },
    convertBlobToURL( blob ) {
      return (
        'data:image/jpeg;base64,' +
        new Buffer(
          new Uint8Array( blob.data ).reduce(
            ( data, byte ) => data + String.fromCharCode( byte ),
            ''
          ),
          'binary'
        ).toString( 'base64' )
      )
    },
  },
  watch : {
    search( val ) {
      val && val.toString().length === 7 ? this.searchLeave() : this.refreshData()
    },
  }
}
</script>
<style lang="scss"></style>
