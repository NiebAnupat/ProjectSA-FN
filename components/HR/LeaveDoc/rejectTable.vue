<template>
  <div>
    <v-simple-table fixed-header height="300">
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
          id: '001',
          name: 'นาย ธนพล ศรีสุข',
          department: 'IT',
        },
      ],
    }
  },
}
</script>
<style lang="scss"></style>
