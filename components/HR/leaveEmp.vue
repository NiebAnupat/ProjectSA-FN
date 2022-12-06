<template>
  <div>
    <v-simple-table fixed-header height="350px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">รหัสพนักงาน</th>
            <th class="text-center">ชื่อ - สกุล</th>
            <th class="text-center">แผนก</th>
            <th class="text-center">ตำแหน่ง</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in todayLeave" :key="item.L_ID">
            <td class="text-center">{{ item.employee.EM_ID }}</td>
            <td>{{ item.employee.EM_FNAME }}&nbsp;&nbsp;{{ item.employee.EM_LNAME }}</td>
            <td class="text-center">{{ item.employee.department.DP_NAME }}</td>
            <td class="text-center">{{ item.employee.position.P_NAME }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {

  props: {
    todayLeave: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {

    }
  },
}
</script>
<style lang="scss"></style>
