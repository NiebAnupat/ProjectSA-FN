<template>
  <div>
    <v-simple-table fixed-header height="350px">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-center">รหัสพนักงาน</th>
          <th class="text-center">ชื่อ - สกุล</th>
          <th class="text-center">เวลาเข้างาน</th>
          <th class="text-center">เวลาออกงาน</th>
          <th class="text-center">สถานะ</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in todayCheckin" :key="item.WT_ID">
          <td class="text-center">{{ item.employee.EM_ID }}</td>
          <td>{{ item.employee.EM_FNAME }}&nbsp;&nbsp;{{ item.employee.EM_LNAME }}</td>
          <td class="text-center">{{ formatTime( item.IN_AT ) }}</td>
          <td class="text-center">{{ formatTime( item.OUT_AT ) }}</td>
          <td class="text-center">
            <v-chip
              :color="
                  !item.IS_LATE
                    ? 'green'
                    : item.IS_LATE
                    ? 'red'
                    : ''
                "
              text-color="white"
            >
                <span
                  v-text="!item.IS_LATE ? 'เข้างานแล้ว' : 'เข้างานเลท'"
                ></span>
            </v-chip>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
const moment = require('moment')
export default {
  props : {
    todayCheckin : {
      type : Array,
      default : () => [],
    },
  },
  data() {
    return {}
  },

  methods : {
    formatTime( time ) {



      if ( time == null ) {
        return 'ยังไม่ออกงาน'
      } else {
        // return time
        // const m = moment( time )
        // // to thai time
        // return m.add( 7, 'hours' ).format( 'HH:mm:ss' )
        // console.log(m)
        // return m.format( 'HH:mm')
        return time
      }
    },
  }
}
</script>
<style lang=""></style>
