<template>
  <div>
    <v-simple-table fixed-header height="300">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-center">รหัสพนักงาน</th>
          <th class="text-center">ชื่อ - สกุล</th>
          <th class="text-center">ประเภทการลา</th>
          <th class="text-center"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in approveDoc" :key="item.L_ID">
          <td class="text-center">{{ item.EM_ID }}</td>
          <td>{{ item.employee.EM_FNAME }}&nbsp;&nbsp;{{ item.employee.EM_LNAME }}</td>
          <td class="text-center">{{ item.leave_type.LY_NAME }}</td>
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
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props : {
    getDetail : {
      type : Function,
    },
    approveDoc : {
      type : Array,
    },
  },
  data() {
    return {
      Emp : [
        {
          id : '001',
          name : 'นาย ธนพล ศรีสุข',
          type : 'ลาป่วย',
        },
      ],
    }
  },

}
</script>
<style lang="scss"></style>
