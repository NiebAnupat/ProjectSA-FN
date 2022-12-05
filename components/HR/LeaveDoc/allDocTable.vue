<template>
  <div>
    <v-simple-table fixed-header height="300">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">รหัสพนักงาน</th>
            <th class="text-center">ชื่อ - สกุล</th>
            <th class="text-center">แผนก</th>
            <th class="text-center">จำนวนวันที่ลา</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Emp" :key="item.id">
            <td class="text-center">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="text-center">{{ item.department }}</td>
            <td class="text-center">{{ dateAmount() }}</td>
            <td class="text-center">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    nuxt
                    @click="dialog = true"
                  >
                    <v-icon color="grey" class="mx-1"> mdi-book-search </v-icon>
                  </v-btn>
                </template>
                <span>รายละเอียด</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="green darken-2" class="mx-1">
                      mdi-check
                    </v-icon>
                  </v-btn>
                </template>
                <span>อนุมัติ</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon color="red darken-2" class="mx-1">
                      mdi-close</v-icon
                    >
                  </v-btn>
                </template>
                <span>ปฏิเสธ</span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

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
          <v-card-title> รายละเอียดการลางาน </v-card-title>
          <v-card-text>
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
              <v-col cols="4">
                <v-container fluid>
                  <v-select :items="type" label="ประเภท" dense></v-select>
                </v-container>
              </v-col>
              <v-col cols="4">
                <v-text-field v-model="other" label="อื่นๆ"></v-text-field>
              </v-col>
              <!-- Document -->
              <v-col cols="4">
                <v-file-input
                  v-model="editImg"
                  label="เอกสารแนบ"
                  prepend-icon="mdi-paperclip"
                  accept="image/*"
                  show-size
                  color="primary"
                ></v-file-input>
              </v-col>
            </v-row>

            <v-row class="d-flex justify-center">
              <v-sheet>
                <div v-if="editImgIsExist()">
                  <img
                    :src="editImg != null ? getImgURL(editImg) : ''"
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
                  v-model="doc"
                  label="หมายเหตุ"
                  placeholder="ระบุเหตุผลการลางาน"
                  outlined
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
export default {
  data() {
    return {
      dialog: false,
      fromDate: '12/12/2020',
      toDate: '12/18/2020',
      fromDatePicker: false,
      toDatePicker: false,
      other: '',
      doc: '',
      editImg: null,
      type: ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน', 'ลาคลอด', 'ลาอื่นๆ'],
      Emp: [
        {
          id: '1',
          name: 'นาย ธนพล พรหมพิทักษ์',
          department: 'IT',
        },
      ],
    }
  },

  methods: {
    getImgURL(img) {
      return URL.createObjectURL(img)
    },

    editImgIsExist() {
      return this.editImg != null
    },

    //get amount of days
    dateAmount() {
      const fromDate = new Date(this.fromDate)
      const toDate = new Date(this.toDate)
      const diffTime = Math.abs(toDate - fromDate)
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1

      if (diffDays === 0) diffDays = 1
      return diffDays
    },
  },
}
</script>
<style lang="scss"></style>
