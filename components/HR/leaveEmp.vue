<template>
  <div>
    <v-simple-table fixed-header height="350px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">รหัสพนักงาน</th>
            <th class="text-center">ชื่อ - สกุล</th>
            <th class="text-center">แผนก</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Emp" :key="item.id">
            <td class="text-center">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="text-center">{{ item.department }}</td>
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
        },
        {
          id: '2',
          name: 'นาย ภัทรพล ฟักแฟง',
          department: 'SMT',
        },
        {
          id: '3',
          name: 'นาย จำดี ปีหน้า',
          department: 'CS',
        },
        {
          id: '4',
          name: 'นาย นะโม ตัสสะ',
          department: 'SMT',
        },
        {
          id: '5',
          name: 'นางสาว สวย ดี',
          department: 'IT',
        },
        {
          id: '6',
          name: 'นางสาว ขำ ชอบ',
          department: 'LG',
        },
        {
          id: '7',
          name: 'นาย วาสนา สุขสวัสดิ์',
          department: 'IT',
        },
        {
          id: '8',
          name: 'นาง แก้ว พิมพ์',
          department: 'CS',
        },
      ],
    }
  },
}
</script>
<style lang=""></style>
