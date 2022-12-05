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
        single-line
        hide-details
        class="mb-4"
      ></v-text-field>
      <v-btn class="my-auto ml-3" text>ค้นหา</v-btn>
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
              <div v-if="Img != null">
                <v-img
                  v-model="Img"
                  class="rounded-lg"
                  :src="Img"
                  width="220"
                  nuxt
                  @click="dialog = true"
                >
                </v-img>
              </div>
              <div v-else>
                <v-img
                  class="rounded-lg"
                  :src="require('~/assets/employee.png')"
                  width="220"
                  nuxt
                  @click="dialog = true"
                >
                </v-img>
              </div>
            </div>

            <v-card-text class="d-flex justify-center mt-4 text-h6"
              >รหัส : 6401861</v-card-text
            >
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
                    @click="isSuccess = true"
                    ><v-icon>mdi-account-edit</v-icon></v-btn
                  >
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
                    ><v-icon>mdi-file-chart</v-icon></v-btn
                  >
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
            <v-card-title> แก้ไขรูปภาพ </v-card-title>
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
              <v-btn class="primary darken-2">ยืนยัน</v-btn>
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
                <v-col cols="6"
                  ><v-text-field
                    v-model="empDetail.Lname"
                    label="นามสกุล"
                  ></v-text-field
                ></v-col>
              </v-row>

              <v-row>
                <v-col cols="4">
                  <v-text-field
                    v-model="empDetail.gender"
                    label="เพศ"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="4"
                  ><v-text-field
                    v-model="empDetail.birthday"
                    label="วันเกิด"
                    readonly
                  ></v-text-field
                ></v-col>
                <v-col cols="4"
                  ><v-text-field
                    v-model="empDetail.tel"
                    label="เบอร์โทร"
                    :rules="telRules"
                  ></v-text-field
                ></v-col>
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
                <v-col cols="6"
                  ><v-text-field
                    v-model="empDetail.startAt"
                    label="วันที่เริ่มงาน"
                    readonly
                  ></v-text-field
                ></v-col>
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
                <v-col cols="6"
                  ><v-text-field
                    v-model="empDetail.changeAt"
                    label="วันที่แก้ไขข้อมูลล่าสุด"
                    readonly
                  ></v-text-field
                ></v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- snackbar -->
    <div>
      <v-snackbar v-model="isSuccess" color="green" :timeout="2300">
        บันทึกข้อมูลสำเร็จ
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs">ปิด </v-btn>
        </template>
      </v-snackbar>
      <v-snackbar v-model="isFaild" color="red" :timeout="2300">
        บันทึกข้อมูลล้มเหลว
        <template v-slot:action="{ attrs }">
          <v-btn color="white" text v-bind="attrs">ปิด </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>
picture

<script>
export default {
  name: 'info',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
    store.dispatch('Auth/setAdminTrue')
  },

  data() {
    return {
      dialog: false,
      isSuccess: false,
      isFaild: false,
      editImg: null,
      search: '',
      empID: '6401861',
      Img: require('~/assets/237603.jpg'),
      typeDept: [
        'ฝ่ายจัดซื้อ',
        'ฝ่ายบุคคล',
        'บัญชี',
        'วิศวกร',
        'ฝ่ายประมูลงาน',
        'แม่บ้าน',
      ],

      typePost: ['พนักงานทั่วไป', 'ผู้จัดการ', 'ผู้บริหาร'],
      status: ['ใช้งาน', 'ไม่ใช้งาน'],
      empDetail: {
        Fname: 'นางสาว สุชานาถ',
        Lname: 'คุ้มบุ่งคล้า',
        gender: 'ไม่บอก',
        birthday: '5/4/1999',
        tel: '0943986347',
        department: 'ฝ่ายบุคคล',
        position: 'พนักงานทั่วไป',
        address:
          '123/456 ถนน สุขุมวิท แขวง บางกอกใหญ่ เขต บางกอกใหญ่ กรุงเทพมหานคร 10700',
        salary: 1000000,
        startAt: '10/10/2020',
        isActivate: 'ใช้งาน',
        changeAt: '10/10/2020',
      },

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
  },
}
</script>
<style lang="scss"></style>
