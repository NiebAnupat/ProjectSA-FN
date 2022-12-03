<template>
  <div>
    <div class="d-flex">
      <h1 class="mt-2">ข้อมูลพนักงาน</h1>
      <v-spacer></v-spacer>
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
      <v-btn class="my-auto ml-3" text v-on:click="search">ค้นหา</v-btn>
    </div>
    <v-divider class="mt-3"></v-divider>

    <!-- Information -->
    <div class="mt-10">
      <v-row>
        <v-col cols="1"></v-col>
        <!-- Picture -->
        <v-col cols="3">
          <v-card class="text-center">
            <v-img
              v-model="picture"
              class="mt-6 rounded-xl"
              src="~/assets/237603.jpg"
              height="250"
              width="220"
              nuxt
              @click="dialog = true"
            ></v-img>

            <v-card-text class="text-h6">รหัส : 6401861</v-card-text>
          </v-card>

          <v-col cols="12" class="mt-2 d-flex justify-center">
            <v-btn icon x-large class="grey lighten-3 mx-3" nuxt
              ><v-icon>mdi-account-edit</v-icon></v-btn
            >
          </v-col>
        </v-col>

        <!-- Dialog -->
        <!-- Edit -->
        <v-dialog v-model="dialog" max-width="500" scrollable>
          <v-card width="500" height="400" class="rounded-lg pa-4">
            <v-card-title> แก้ไขรูปภาพ </v-card-title>
            <v-card-text>
              <v-file-input
                v-model="editImg"
                label="รูปภาพ"
                show-size
                counter
                multiple
                small
                small-chips
                ref="imgRef"
                :rules="[(v) => !!v || 'กรุณาเลือกรูปภาพ']"
              ></v-file-input>
              <!-- Show image -->
              <div class="d-flex justify-center pt-6">
                <img :src="editImg" />
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
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6"
                  ><v-text-field
                    v-model="empDetail.Lname"
                    label="นามสกุล"
                    readonly
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
                    readonly
                  ></v-text-field
                ></v-col>
              </v-row>

              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="empDetail.department"
                    label="แผนก"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col cols="6"
                  ><v-text-field
                    v-model="empDetail.position"
                    label="ตำแหน่ง"
                    readonly
                  ></v-text-field
                ></v-col>
              </v-row>

              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="empDetail.address"
                    label="ที่อยู่"
                    outlined
                    readonly
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
                    readonly
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
                  <v-text-field
                    v-model="empDetail.isActivate"
                    label="สถานะ"
                    readonly
                  ></v-text-field>
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
  </div>
</template>

<script>
export default {
  name: 'EmpInfo',
  async asyncData({ store }) {
    store.dispatch('Auth/setAuthTrue')
  },

  data() {
    return {
      dialog: false,
      editImg: null,
      search: '',
      empID: '6401861',
      empDetail: {
        Fname: 'นางสาว สุชานาถ',
        Lname: 'คุ้มบุ่งคล้า',
        gender: 'ไม่บอก',
        birthday: '5/4/1999',
        tel: '0943986347',
        department: 'วิทยาการคอมพิวเตอร์',
        position: 'โปรแกรมเมอร์',
        address:
          '123/456 ถนน สุขุมวิท แขวง บางกอกใหญ่ เขต บางกอกใหญ่ กรุงเทพมหานคร 10700',
        salary: '10,000,000',
        startAt: '10/10/2020',
        isActivate: 'ใช้งาน',
        changeAt: '10/10/2020',
      },
    }
  },

  methods: {
    imgIsExist() {
      return this.editImg.image.length > 0 ? true : false
    },

    editPicExist() {
      return this.editImg.image.length > 0 ? true : false
    },
  },
}
</script>
<style lang="scss"></style>
