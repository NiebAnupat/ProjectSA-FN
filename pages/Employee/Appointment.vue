<template>
  <div>
    <div>
      <h1 class="mt-2">นัดหมายการทำงาน</h1>
      <v-divider class="mt-3"></v-divider>
    </div>

    <!-- Add/Check appointment -->
    <div>
      <v-row class="pt-10">
        <v-col cols="6">
          <v-card nuxt @click=";(checkTable = true), (addTable = false)">
            <v-card-title class="d-flex justify-center">
              รับนัดหมาย
            </v-card-title>
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card nuxt @click=";(addTable = true), (checkTable = false)">
            <v-card-title class="d-flex justify-center">
              เพิ่มนัดหมาย
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Search -->
    <div class="mt-10">
      <v-row class="pb-2">
        <v-spacer></v-spacer>
        <v-col cols="4"
          ><v-text-field
            v-model="search"
            prepend-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
            class="mb-4"
          ></v-text-field
        ></v-col>
      </v-row>
    </div>

    <!-- Table -->
    <div v-if="checkTable">
      <CheckAp :s="search" />
    </div>
    <div v-else>
      <AddAp :s="search" />
    </div>

    <div class="text-right">
      <v-btn class="mt-6" fab dark color="indigo" nuxt @click="dialog = true">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </div>

    <div>
      <v-dialog v-model="dialog" scrollable :overlay="false" max-width="550px">
        <v-card height="620" class="pa-4">
          <v-card-title> รายละเอียดการนัดหมาย </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="ผู้นัดหมาย"
                  v-model="createby"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field label="หัวข้อ" v-model="subject"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="name"
                  label="ผู้เข้าร่วม"
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-menu
                  v-model="datePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="วัน"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    @input="datePicker = false"
                    scrollable
                    color="primary"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">
                <v-menu
                  v-model="timePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="เวลา"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="time"
                    @input="timePicker = false"
                    scrollable
                    color="primary"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field label="สถานที่" v-model="location"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="detail"
                  label="รายละเอียด"
                  outlined
                  rows="3"
                  hide-details
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text>ตกลง</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import CheckAp from '~/components/Employee/CheckAp.vue'
import AddAp from '~/components/Employee/AddAp.vue'
export default {
  name: 'Appointment',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },

  components: { CheckAp, AddAp },

  data() {
    return {
      dialog: false,
      search: '',
      checkTable: false,
      addTable: false,
      createby: '',
      subject: '',
      location: '',
      name: '',
      detail: '',
      date: null,
      time: null,
      datePicker: false,
      timePicker: false,

      // dialog: false,
      // checkTable: false,
      // addTable: false,
      // search: '',
      // creatby: '',
      // name: '',
      // subject: '',
      // location: '',
      // date: null,
      // time: null,
      // detail: '',
      // datePicker: false,
      // timePicker: false,
    }
  },
}
</script>
<style lang="scss"></style>
