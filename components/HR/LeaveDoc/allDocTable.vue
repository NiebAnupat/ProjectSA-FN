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
            <td class="text-center">{{ item.totaldate }}</td>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      editImg: null,
      type: ['ลาป่วย', 'ลากิจ', 'ลาพักร้อน', 'ลาคลอด', 'ลาอื่นๆ'],
      Emp: [
        {
          id: '1',
          name: 'นาย ธนพล พรหมพิทักษ์',
          department: 'IT',
          totaldate: '5',
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
  },
}
</script>
<style lang="scss"></style>
