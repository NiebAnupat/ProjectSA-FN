<template>
  <div>
    <v-data-table :headers="headers" :items="appointment" class="elevation-1">
      <template v-slot:item.status="{ item }">
        <v-chip
          :color="
            item.status === 't'
              ? 'primary darken-2'
              : item.status === 'f'
              ? 'red'
              : 'grey'
          "
          text-color="white"
        >
          <v-icon color="white" class="mr-2">
            {{
              item.status === 't'
                ? 'mdi-check'
                : item.status === 'f'
                ? 'mdi-close'
                : 'mdi-alarm'
            }}
          </v-icon>

          <span
            v-text="
              item.status === 't'
                ? 'ตอบรับแล้ว'
                : item.status === 'f'
                ? 'ปฏิเสธแล้ว'
                : 'รอการตอบรับ'
            "
          ></span>
        </v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="grey" class="mx-1"> mdi-book-search </v-icon>
            </v-btn>
          </template>
          <span>รายละเอียด</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="primary darken-2" class="mx-1">
                mdi-check-circle
              </v-icon>
            </v-btn>
          </template>
          <span>ตอบรับ</span>
        </v-tooltip>

        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="red darken-2" class="mx-1">
                mdi-close-circle
              </v-icon>
            </v-btn>
          </template>
          <span>ปฏิเสธ</span>
        </v-tooltip>
      </template></v-data-table
    >
  </div>
</template>

<script>
export default {
  props: {
    s: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      headers: [
        {
          text: 'ลำดับ',
          align: 'center',
          sortable: false,
          value: 'id',
          class: 'text-center',
        },
        {
          text: 'ชื่อ',
          align: 'start',
          sortable: false,
          value: 'name',
          class: 'text-center',
        },
        {
          text: 'หัวข้อ',
          align: 'center',
          sortable: false,
          value: 'detail',
          class: 'text-center',
        },
        {
          text: 'วัน/เดือน/ปี',
          align: 'center',
          value: 'date',
          class: 'text-center',
        },
        {
          text: 'สถานะ',
          align: 'center',
          sortable: false,
          value: 'status',
          class: 'text-center',
        },
        { text: '', align: 'center', value: 'action', sortable: false },
      ],

      appointment: [
        {
          id: '1',
          name: 'สุชานาถ คุ้มบุ่งคล้า',
          detail: 'นัดหมายการทำงาน',
          date: '12-12-2020',
          status: 't',
          action: '',
        },
        {
          id: '2',
          name: 'อนุภัทร แก้วมี',
          detail: 'นัดหมายการทำงาน',
          date: '12-12-2020',
          status: 'f',
          action: '',
        },
        {
          id: '3',
          name: 'ชัยวัฒน์ แสงศรี',
          detail: 'นัดหมายการทำงาน',
          date: '12-12-2020',
          status: '',
          action: '',
        },
      ],
    }
  },
}
</script>
<style lang=""></style>
