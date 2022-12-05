<template>
  <div>
    <div>
      <h1 class="mt-2">หน้าหลัก</h1>
      <v-divider class="mt-3"></v-divider>
    </div>

    <!-- Pic -->
    <div class="d-flex justify-center pa-10">
      <img height="250" width="2000" src="~/assets/Pic00.jpg" />
    </div>

    <!-- Check in / Check out -->
    <div>
      <v-row class="pt-10">
        <v-col cols="6">
          <v-card nuxt @click="checkInEmp">
            <v-card-title class="d-flex justify-center"
              >ลงชื่อเข้า</v-card-title
            >
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card nuxt @click="checkOutEmp">
            <v-card-title class="d-flex justify-center">ลงชื่อออก</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Leave -->
    <div>
      <v-row class="pt-10">
        <v-col>
          <v-card to="/Employee/LeaveEmp">
            <v-card-title class="d-flex justify-center">ลางาน</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog -->
    <!-- Checkin -->
    <v-dialog v-model="checkIn" hide-overlay max-width="350">
      <v-card height="150" class="green pa-6">
        <v-card-title class="d-flex justify-center white--text">
          <span>ลงชื่อเข้าทำงานสำเร็จ!</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-2 white--text">
          วัน/เวลา : {{ inDateTime }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Checkout -->
    <v-dialog v-model="checkOut" hide-overlay max-width="350">
      <v-card height="150" class="primary lighten-1 pa-6">
        <v-card-title class="d-flex justify-center white--text">
          <span>ลงชื่อออกสำเร็จ!</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-2 white--text">
          วัน/เวลา : {{ outDateTime }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Leave Work
    <v-dialog v-model="dialog" max-width="650px">
      <v-card class="pa-4">
        <v-card-title class="pb-6"> รายละเอียดการลางาน </v-card-title>
        <v-card-text>
          Leave Date
          <v-row cols="12">
            <v-col md="6">
              <v-menu
                v-model="leaveDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="leaveDate"
                    label="วันที่ต้องการลา"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="leaveDate"
                  @input="leaveDatePicker = false"
                  scrollable
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-col>

            Document
            <v-col cols="6">
              <v-file-input
                label="เอกสารแนบ"
                prepend-icon="mdi-paperclip"
                accept="image/*"
                show-size
                color="primary"
              ></v-file-input>
            </v-col>
          </v-row>

          Text
          <v-row mt-n5>
            <v-col cols="12">
              <v-textarea
                label="หมายเหตุ"
                placeholder="ระบุเหตุผลการลางาน"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="primary darken-2">ยืนยัน</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> -->
  </div>
</template>
<script>
import { on } from 'events'

export default {
  name: 'Checkin',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },

  data() {
    return {
      checkIn: false,
      checkOut: false,
      dialog: false,
      inDateTime: '',
      outDateTime: '',
      leaveDatePicker: false,
      leaveDate: null,
    }
  },

  methods: {
    async checkInEmp() {
      this.inDateTime = new Date().toLocaleString()
      this.checkIn = true
      const {EM_ID} = this.$store.getters['Auth/user']
      await this.$axios.$post( '/workTime/checkIn', {
        EM_ID : EM_ID,
      } )

      setTimeout( () => (this.checkIn = false), 2000 )
    },
    async checkOutEmp() {
      this.outDateTime = new Date().toLocaleString()
      this.checkOut = true
      const {EM_ID} = this.$store.getters['Auth/user']
      await this.$axios.$post('/workTime/checkOut',{
        EM_ID : EM_ID,
      })
      setTimeout(() => (this.checkOut = false), 2000)
    },
  },

}
</script>
<style lang="scss"></style>
