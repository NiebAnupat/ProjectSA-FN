<template>
  <div>
    <v-simple-table fixed-header height="300">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-center">รหัสพนักงาน</th>
            <th class="text-center">ชื่อ - สกุล</th>
            <th class="text-center">แผนก</th>
            <th class="text-center"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in Emp" :key="item.id">
            <td class="text-center">{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td class="text-center">{{ item.department }}</td>
            <td class="text-center">
              <v-tooltip top>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on" to="/HR/Info">
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
  data() {
    return {}
  },
}
</script>
<style lang="scss"></style>
