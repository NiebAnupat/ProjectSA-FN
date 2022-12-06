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
          <tr v-for="item in leaveDoc" :key="item.L_ID">
            <td class="text-center">{{ item.EM_ID }}</td>
            <td>{{ item.employee.EM_FNAME }}&nbsp;&nbsp;{{ item.employee.EM_LNAME }}</td>
            <td class="text-center">{{ item.employee.department.DP_NAME }}</td>
            <td class="text-center">{{ dateAmount(item) }}</td>
            <td class="text-center">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                    nuxt
                    @click="getDetail(item)"
                  >
                    <v-icon color="grey" class="mx-1"> mdi-book-search </v-icon>
                  </v-btn>
                </template>
                <span>รายละเอียด</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="approve(item)">
                    <v-icon color="green darken-2" class="mx-1">
                      mdi-check
                    </v-icon>
                  </v-btn>
                </template>
                <span>อนุมัติ</span>
              </v-tooltip>

              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" @click="reject(item)">
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


  </div>
</template>

<script>

export default {
  props: {
    getDetail:{
      type: Function ,
    },
    leaveDoc:{
      type: Array ,
    },
    refreshData:{
      type: Function ,
    },
  },

  data() {
    return {
      dialog: false,
      fromDate: '12/12/2020',
      toDate: '12/12/2020',
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

    async approve( item ) {
      await this.$axios.$put( '/leaveWork/approve/'+item.L_ID )
      this.refreshData()

    },

    async reject( item ) {
      await this.$axios.$put( '/leaveWork/reject/'+item.L_ID )
      this.refreshData()
    },

    //get amount of days
    dateAmount(item) {
      const fromDate = new Date(item.L_DATE_START )
      const toDate = new Date(item.L_DATE_END)
      const diffTime = Math.abs(toDate - fromDate)
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      if (diffDays === 0) diffDays = 1
      return diffDays
    },
  },
}
</script>
<style lang="scss"></style>
