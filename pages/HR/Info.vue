<template>
  <div>
    <div class="d-flex">
      <h1 class="mt-2">ข้อมูลพนักงาน</h1>
      <div class="mt-2">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
              class="lighten-3 mt-2 mx-3"
              nuxt
              @click="printAllPaySlip"
            >
              <v-icon>mdi-share-all</v-icon>
            </v-btn>
          </template>

          <span>พิมพ์ใบเสร็จเงินเดือนทั้งหมด</span>
        </v-tooltip>
      </div>

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
        @keydown.enter="getEmployeeDetail"
      ></v-text-field>
      <v-btn
        class="my-auto ml-3"
        :disabled="search.length !== 7"
        text
        @click="getEmployeeDetail"
        >ค้นหา</v-btn
      >
    </div>
    <v-divider class="mt-3"></v-divider>

    <!-- Information -->
    <div class="mt-10">
      <v-row>
        <v-col cols="1"></v-col>
        <!-- Picture -->
        <v-col cols="3">
          <v-card class="pa-4">
            <div class="d-flex justify-center">
              <div v-if="editImg != null">
                <v-img
                  class="rounded-lg"
                  :src="getImgURL(editImg)"
                  max-width="220"
                  max-height="320"
                  nuxt
                  @click="dialog = true"
                >
                </v-img>
              </div>
              <div v-else-if="empDetail.Img != null">
                <v-img
                  class="rounded-lg"
                  :src="empDetail.Img"
                  max-width="220"
                  max-height="320"
                  nuxt
                  @click="dialog = true"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  class="rounded-lg"
                  :src="require('~/assets/employee.png')"
                  max-width="220"
                  max-height="320"
                  nuxt
                  @click="dialog = true"
                >
                </v-img>
              </div>
            </div>

            <v-card-text class="d-flex justify-center mt-4 text-h6"
              >รหัส : {{ empDetail.EM_ID }}
            </v-card-text>
          </v-card>

          <v-row class="mt-4 d-flex justify-center">
            <v-col cols="3">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    x-large
                    v-bind="attrs"
                    v-on="on"
                    class="grey lighten-3 mx-3"
                    nuxt
                    @click="updateEmpDetail"
                    :disabled="empDetail.EM_ID === '0000000'"
                  >
                    <v-icon>mdi-account-edit</v-icon>
                  </v-btn>
                </template>

                <span>บันทึกข้อมูล</span>
              </v-tooltip>
            </v-col>
            <v-col cols="3">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    x-large
                    v-bind="attrs"
                    v-on="on"
                    class="grey lighten-3 mx-3"
                    nuxt
                    :disabled="empDetail.EM_ID === '0000000'"
                    @click="getPaySlip"
                  >
                    <v-icon>mdi-file-chart</v-icon>
                  </v-btn>
                </template>

                <span>พิมพ์ใบเสร็จรับเงิน</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-col>

        <!-- Dialog -->
        <!-- Edit -->
        <v-dialog v-model="dialog" max-width="550" scrollable>
          <v-card class="rounded-lg pa-4">
            <v-card-title> แก้ไขรูปภาพ</v-card-title>
            <v-card-text>
              <v-file-input
                v-model="editImg"
                label="รูปภาพ"
                show-size
                accept="image/*"
              ></v-file-input>
              <!-- Show image -->
              <div class="d-flex justify-center pt-6">
                <img
                  :src="editImg != null ? getImgURL(editImg) : ''"
                  width="250"
                />
              </div>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="primary darken-2" @click="dialog = false"
                >ยืนยัน</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>

        <!-- Detail -->
        <v-col cols="7">
          <v-card class="rounded-xl" height="600">
            <v-card-text class="px-8 title">
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="empDetail.Fname"
                    label="ชื่อ"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="empDetail.Lname"
                    label="นามสกุล"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="empDetail.gender"
                    label="เพศ"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="empDetail.birthday"
                    label="วันเกิด"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="empDetail.tel"
                    label="เบอร์โทร"
                    :rules="telRules"
                    ref="tel"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-container fluid>
                    <v-select
                      v-model="empDetail.department"
                      :items="typeDept"
                      label="แผนก"
                      dense
                    ></v-select>
                  </v-container>
                </v-col>
                <v-col cols="6">
                  <v-container fluid>
                    <v-select
                      v-model="empDetail.position"
                      :items="typePost"
                      label="ตำแหน่ง"
                      dense
                    ></v-select>
                  </v-container>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="empDetail.address"
                    label="ที่อยู่"
                    outlined
                    rows="3"
                    hide-details
                  ></v-textarea>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="empDetail.salary"
                    label="เงินเดือน"
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="empDetail.startAt"
                    label="วันที่เริ่มงาน"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-container fluid>
                    <v-select
                      v-model="empDetail.isActivate"
                      :items="status"
                      label="สถานะ"
                      dense
                    ></v-select>
                  </v-container>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="empDetail.changeAt"
                    label="วันที่แก้ไขข้อมูลล่าสุด"
                    readonly
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
const moment = require('moment')
import PDFMerger from 'pdf-merger-js/browser'

export default {
  name: 'info',
  middleware : 'auth',
  data() {
    return {
      dialog: false,
      isSuccess: false,
      isFaild: false,
      editImg: null,
      search: '',
      empID: '',

      typeDept: [
        'จัดซ์็อ',
        'ทรัพยากรบุคคล',
        'บัญชี',
        'วิศวกร',
        'ประมูลงาน',
        'อาคาร',
      ],

      typePost: ['พนักงานทั่วไป', 'ผู้จัดการ', 'ผู้บริหาร'],
      status: ['ใช้งาน', 'ไม่ใช้งาน'],
      empDetail: {
        EM_ID: '0000000',
        Fname: '',
        Lname: '',
        gender: '',
        birthday: '',
        tel: '',
        department: '',
        position: '',
        address: '',
        salary: 0,
        startAt: '',
        isActivate: '',
        changeAt: '',
        Img: null,
      },
      searchRules: [
        (v) => v.length === 7 || 'กรุณากรอกรหัสพนักงาน 7 หลัก',
        (v) => !isNaN(v) || 'กรุณากรอกเป็นตัวเลขเท่านั้น',
      ],

      telRules: [
        (v) => !!v || 'กรุณากรอกเบอร์โทร',
        (v) => v.length === 10 || 'กรุณากรอกเบอร์โทรให้ครบ 10 หลัก',
        (v) => !isNaN(v) || 'กรุณากรอกเบอร์โทรเป็นตัวเลขเท่านั้น',
      ],
    }
  },

  methods: {
    getImgURL(img) {
      return URL.createObjectURL(img)
    },

    getEmployeeDetail() {
      this.editImg = null
      const EM_ID = this.search
      this.$axios
        .$get('/employee/by/' + EM_ID)
        .then((res) => {
          console.log(res)
          if (res) {
            const {
              EM_ID,
              EM_FNAME,
              EM_LNAME,
              EM_GENDER,
              EM_ADDRESS,
              EM_TEL,
              EM_BRITHDAY,
              department,
              position,
              EM_SALARY,
              EM_HIRE_DATE,
              EM_IS_ACTIVATE,
              EM_CHANGE_AT,
              EM_IMAGE,
            } = res
            this.empDetail = {
              EM_ID: EM_ID,
              Fname: EM_FNAME,
              Lname: EM_LNAME,
              gender: EM_GENDER,
              birthday: moment(EM_BRITHDAY).format('DD/MM/YYYY'),
              tel: EM_TEL,
              department: department.DP_NAME,
              position: position.P_NAME,
              address: EM_ADDRESS,
              salary: EM_SALARY,
              startAt: moment(EM_HIRE_DATE).format('DD/MM/YYYY'),
              isActivate: EM_IS_ACTIVATE ? 'ใช้งาน' : 'ไม่ใช้งาน',
              changeAt: moment(EM_CHANGE_AT).format('DD/MM/YYYY'),
              Img: this.convertBlobToURL(EM_IMAGE),
            }
          } else {
            this.$swal('ไม่พบข้อมูล', 'กรุณากรอกรหัสพนักงานใหม่', 'error')
            this.empDetail = {
              EM_ID: '0000000',
              Fname: '',
              Lname: '',
              gender: '',
              birthday: '',
              tel: '',
              department: '',
              position: '',
              address: '',
              salary: 0,
              startAt: '',
              isActivate: '',
              changeAt: '',
              Img: null,
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    updateEmpDetail() {
      const EM_ID = this.empDetail.EM_ID
      const formData = new FormData()
      formData.append('EM_IMAGE', this.editImg)
      formData.append('EM_FNAME', this.empDetail.Fname)
      formData.append('EM_LNAME', this.empDetail.Lname)
      formData.append('EM_ADDRESS', this.empDetail.address)
      formData.append('EM_TEL', this.empDetail.tel)
      formData.append('EM_SALARY', this.empDetail.salary)
      formData.append('EM_IS_ACTIVATE', this.empDetail.isActivate === 'ใช้งาน')
      formData.append('DP_NAME', this.empDetail.department)
      formData.append('P_NAME', this.empDetail.position)

      this.$axios
        .$put('/employee/' + EM_ID, formData)
        .then((res) => {
          if (res) {
            this.$swal('แก้ไขข้อมูลสำเร็จ', '', 'success')
            this.getEmployeeDetail()
          } else this.$swal('แก้ไขข้อมูลล้มเหลว', '', 'error')
        })
        .catch((err) => {
          this.isFaild = true
          this.dialog = false
          console.log(err)
        })
    },

    async getPaySlip() {
      const EM_ID = this.empDetail.EM_ID

      const baseURL = this.$axios.defaults.baseURL
      window.open(`${baseURL}payment/by/` + EM_ID, '_blank')
    },

    async printAllPaySlip() {
      const baseURL = this.$axios.defaults.baseURL
      window.open(`${baseURL}payment/all`, '_blank')
    },

    convertBlobToURL(blob) {
      return (
        'data:image/jpeg;base64,' +
        new Buffer(
          new Uint8Array(blob.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          ),
          'binary'
        ).toString('base64')
      )
    },
  },
}
</script>
<style lang="scss"></style>
