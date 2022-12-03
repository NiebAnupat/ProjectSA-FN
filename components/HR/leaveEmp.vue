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
          <tr v-for="item in Emp" :key="item.id">
            <td class="text-center">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="text-center">{{ item.department }}</td>
            <td class="text-center">{{ item.position }}</td>
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
          position: 'Programmer',
        },
        {
          id: '2',
          name: 'นาย ภัทรพล ฟักแฟง',
          department: 'SMT',
          position: 'Programmer',
        },
        {
          id: '3',
          name: 'นาย จำดี ปีหน้า',
          department: 'CS',
          position: 'Programmer',
        },
        {
          id: '4',
          name: 'นาย นะโม ตัสสะ',
          department: 'SMT',
          position: 'Programmer',
        },
        {
          id: '5',
          name: 'นางสาว สวย ดี',
          department: 'IT',
          position: 'Programmer',
        },
        {
          id: '6',
          name: 'นางสาว ขำ ชอบ',
          department: 'LG',
          position: 'Programmer',
        },
        {
          id: '7',
          name: 'นาย วาสนา สุขสวัสดิ์',
          department: 'IT',
          position: 'Programmer',
        },
        {
          id: '8',
          name: 'นาง แก้ว พิมพ์',
          department: 'CS',
          position: 'Programmer',
        },
      ],
    }
  },
}
</script>
<style lang="scss"></style>
