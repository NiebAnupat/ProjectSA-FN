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
                <v-select
                  :items="type"
                  label="ประเภท"
                  dense
                  v-model="selectedType"
                ></v-select>
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
                v-model="img"
              ></v-file-input>
            </v-col>
          </v-row>

          <!-- Text -->
          <v-row mt-n5>
            <v-col cols="12">
              <v-textarea
                v-model="detail"
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
            color="primary darken-2"
            :disabled="!fromDate || !toDate || !type || !detail"
            @click="submit"
            >ยืนยัน
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>

    <!-- snackbar -->
    <div>
      <v-snackbar v-model="isSuccess" color="green" :timeout="2300">
        ส่งเอกสารลางานสำเร็จ
        <template v-slot:action="{ attrs }">
        </template>
      </v-snackbar>
      <v-snackbar v-model="isFaild" color="red" :timeout="2300">
        จำนวนวันลาไม่เพียงพอ กรุณาตรวจสอบ
        <template v-slot:action="{ attrs }">
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LeaveEmp',


  data() {
    return {
      isSuccess: '',
      isFaild: '',
      fromDate: null,
      toDate: null,
      fromDatePicker: false,
      toDatePicker: false,
      type: ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน', 'ลาคลอดบุตร', 'ลาอุปสมบท'],
      selectedType: '',
      detail: null,
      img: null,
    }
  },

  methods: {
    async submit() {
      const { EM_ID } = this.$store.getters['Auth/user']
      const formData = new FormData()
      formData.append('EM_ID', EM_ID)
      formData.append('L_TYPE_NAME', this.selectedType)
      formData.append('L_DATE_START', this.fromDate)
      formData.append('L_DATE_END', this.toDate)
      formData.append('L_NOTE', this.detail)
      formData.append('image', this.img)

      this.$axios.$post('/leaveWork/', formData).then((res) => {
        if (res) {
          this.isSuccess = true
          setTimeout(() => {
            this.isSuccess = false
          }, 2000)
        } else {
          this.isFaild = true
          setTimeout(() => {
            this.isFaild = false
          }, 2000)
        }
      })
    },
  },
}
</script>
<style lang="scss"></style>
