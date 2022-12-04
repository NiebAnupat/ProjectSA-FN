<template>
  <div>
    <div>
      <h1 class="mt-2">ส่งเอกสารลางาน</h1>
      <v-divider class="mt-3"></v-divider>
    </div>

    <div class="mt-14">
      <v-card class="pa-4">
        <v-row>
          <v-spacer></v-spacer>
          <p class="pa-4 grey--text">
            *การลาประเภทลาป่วยที่ลามากกว่า 3 วัน กรุณาแนบใบรับรองแพทย์
          </p>
        </v-row>

        <v-card-text class="mt-6">
          <!-- Leave Date -->
          <v-row cols="12">
            <v-col md="6">
              <v-menu
                v-model="fromDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="fromDate"
                    label="วันที่ต้องการลา"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fromDate"
                  @input="fromDatePicker = false"
                  scrollable
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-col>

            <v-col cols="6">
              <v-menu
                v-model="toDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="toDate"
                    label="ถึงวันที่"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="toDate"
                  @input="toDatePicker = false"
                  scrollable
                  color="primary"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-container fluid>
                <v-select :items="type" label="ประเภท" dense></v-select>
              </v-container>
            </v-col>
            <!-- Document -->
            <v-col cols="6">
              <v-file-input
                label="เอกสารแนบ"
                accept="image/png, image/jpeg"
                prepend-icon="mdi-paperclip"
                show-size
                color="primary"
              ></v-file-input>
            </v-col>
          </v-row>

          <!-- Text -->
          <v-row mt-n5>
            <v-col cols="12">
              <v-textarea
                v-model="doc"
                label="หมายเหตุ"
                placeholder="ระบุเหตุผลการลางาน"
                outlined
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            class="primary darken-2"
            :disabled="!fromDate || !toDate || !type || !doc"
            @click=";(success = true), (fail = false)"
            >ยืนยัน</v-btn
          >
        </v-card-actions>
      </v-card>
    </div>

    <!-- snackbar -->
    <div>
      <v-snackbar v-model="success" :timeout="2300">
        ส่งเอกสารลางานสำเร็จ
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="success = false"
            >ปิด</v-btn
          >
        </template>
      </v-snackbar>
      <v-snackbar v-model="fail" :timeout="2300">
        จำนวนวันลาไม่เพียงพอ
        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="fail = false"
            >ปิด</v-btn
          >
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeaveEmp',

  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },

  data() {
    return {
      success: false,
      fail: false,
      fromDate: null,
      toDate: null,
      fromDatePicker: false,
      toDatePicker: false,
      type: ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน', 'ลาคลอดบุตร', 'ลาอุปสมบท'],
      doc: null,
    }
  },
}
</script>
<style lang="scss"></style>
