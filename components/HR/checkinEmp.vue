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
          <tr v-for="item in Emp" :key="item.id">
            <td class="text-center">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="text-center">{{ item.timein }}</td>
            <td class="text-center">{{ item.timeout }}</td>
            <td class="text-center">
              <v-chip
                :color="
                  item.status === 't'
                    ? 'green'
                    : item.status === 'f'
                    ? 'red'
                    : ''
                "
                text-color="white"
              >
                <span
                  v-text="item.status === 't' ? 'เข้างานแล้ว' : 'เข้างานเลท'"
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
export default {
  data() {
    return {
      Emp: [
        {
          id: '1',
          name: 'นาย ธนพล พรหมพิทักษ์',
          department: 'IT',
          timein: '08:00',
          timeout: '17:00',
          status: 't',
        },
        {
          id: '2',
          name: 'นาย ภัทรพล ฟักแฟง',
          department: 'SMT',
          timein: '08:00',
          timeout: '17:00',
          status: 't',
        },
        {
          id: '3',
          name: 'นาย จำดี ปีหน้า',
          department: 'CS',
          timein: '08:00',
          timeout: '17:00',
          status: 'f',
        },
        {
          id: '4',
          name: 'นาย นะโม ตัสสะ',
          department: 'SMT',
          timein: '08:00',
          timeout: '17:00',
          status: 't',
        },
        {
          id: '5',
          name: 'นางสาว สวย ดี',
          department: 'IT',
          timein: '08:00',
          timeout: '17:00',
          status: 't',
        },
        {
          id: '6',
          name: 'นางสาว ขำ ชอบ',
          department: 'LG',
          timein: '08:00',
          timeout: '17:00',
          status: 'f',
        },
        {
          id: '7',
          name: 'นาย วาสนา สุขสวัสดิ์',
          department: 'IT',
          timein: '08:00',
          timeout: '17:00',
          status: 't',
        },
        {
          id: '8',
          name: 'นาง แก้ว พิมพ์',
          department: 'CS',
          timein: '08:00',
          timeout: '17:00',
          status: 't',
        },
      ],
    }
  },
}
</script>
<style lang=""></style>
