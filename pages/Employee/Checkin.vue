<template>
  <div>
    <div>
      <h1 class="mt-2">หน้าหลัก</h1>
      <v-divider class="mt-3"></v-divider>
    </div>

    <!-- Pic -->
    <div class="d-flex justify-center pa-10">
      <img height="250" width="2000" src="~/assets/Pic00.jpg" />
    </div>

    <!-- Check in / Check out -->
    <div>
      <v-row class="pt-10">
        <v-col cols="6">
          <v-card nuxt @click="checkInEmp">
            <v-card-title class="d-flex justify-center"
            >ลงชื่อเข้า
            </v-card-title
            >
          </v-card>
        </v-col>

        <v-col cols="6">
          <v-card nuxt @click="checkOutEmp">
            <v-card-title class="d-flex justify-center">ลงชื่อออก</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Leave -->
    <div>
      <v-row class="pt-10">
        <v-col>
          <v-card to="/Employee/LeaveEmp">
            <v-card-title class="d-flex justify-center">ลางาน</v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Dialog -->
    <!-- Checkin -->
    <v-dialog v-model="checkIn" hide-overlay max-width="350">
      <v-card height="150" class="green pa-6">
        <v-card-title class="d-flex justify-center white--text">
          <span>ลงชื่อเข้าทำงานสำเร็จ!</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-2 white--text">
          วัน/เวลา : {{ inDateTime }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Already Checkin -->
    <v-dialog v-model="alreadyCheckIn" hide-overlay max-width="450">
      <v-card height="150" class="yellow darken-4 pa-6">
        <v-card-title class="d-flex justify-center white--text">
          <span>คุณได้ลงชื่อเข้าทำงานแล้วในวันนี้</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-2 white--text">
          วัน/เวลา : {{ inDateTime }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Checkout -->
    <v-dialog v-model="checkOut" hide-overlay max-width="350">
      <v-card height="150" class="primary lighten-1 pa-6">
        <v-card-title class="d-flex justify-center white--text">
          <span>ลงชื่อออกสำเร็จ!</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-2 white--text">
          วัน/เวลา : {{ outDateTime }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Already Checkout -->
    <v-dialog v-model="alreadyCheckOut" hide-overlay max-width="450">
      <v-card height="150" class="yellow darken-4 pa-6">
        <v-card-title class="d-flex justify-center white--text">
          <span>คุณได้ลงชื่อออกแล้วในวันนี้</span>
        </v-card-title>
        <v-card-text class="d-flex justify-center mt-2 white--text">
          วัน/เวลา : {{ outDateTime }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Not Checkin -->
    <v-dialog v-model="notCheckIn" hide-overlay max-width="350">
      <v-card height="150" class="red pa-6">
        <v-card-title class="text-center white--text">
          <span>คุณยังไม่ได้ลงชื่อเข้าทำงาน!</span>
        </v-card-title>
      </v-card>
    </v-dialog>



  </div>
</template>
<script>
export default {
  name: "Checkin",
  middleware : 'auth',
  data() {
    return {
      checkIn: false,
      alreadyCheckIn: false,
      checkOut: false,
      alreadyCheckOut: false,
      notCheckIn: false,
      dialog: false,
      inDateTime: "",
      outDateTime: "",
      leaveDatePicker: false,
      leaveDate: null
    };
  },

  methods: {
    async checkInEmp() {
      const { EM_ID } = this.$store.getters["Auth/user"];
      const temp = await this.$axios.$post("/workTime/checkIn", {
        EM_ID: EM_ID
      });
      if (temp.msg === "Check in success") {
        this.inDateTime = `${this.formatDate(temp.data.DATE)} ${this.formatTime(temp.data.IN_AT)}`;
        this.checkIn = true;
        setTimeout(() => (this.checkIn = false), 2000);
      }
      else {
        this.inDateTime = `${this.formatDate(temp.data.DATE)} ${this.formatTime(temp.data.IN_AT)}`;
        this.alreadyCheckIn = true;
        setTimeout(() => (this.alreadyCheckIn = false), 2000);
      }

    },
    async checkOutEmp() {
      const {EM_ID} = this.$store.getters['Auth/user']
      const temp = await this.$axios.$post('/workTime/checkOut',{
        EM_ID : EM_ID,
      })
      if(temp.msg === 'Check out success'){
        this.outDateTime = `${this.formatDate(temp.data[0].DATE)} ${this.formatTime(temp.data[0].OUT_AT)}`;
        this.checkOut = true;
        setTimeout(() => (this.checkOut = false), 2000);
      }
      else if (temp.msg === 'Not check in today'){
        this.notCheckIn = true;
        setTimeout(() => (this.notCheckIn = false), 2000);
      }
      else{
        this.outDateTime = `${this.formatDate(temp.data[0].DATE)} ${this.formatTime(temp.data[0].OUT_AT)}`;
        this.alreadyCheckOut = true;
        setTimeout(() => (this.alreadyCheckOut = false), 2000);
      }

    },
    formatDate(date) {
      const d = new Date(new Date(date).toUTCString());
      let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      let thaiDate = d.toLocaleDateString("th-TH", options);
      thaiDate = thaiDate.split(" ");
      thaiDate.pop();
      thaiDate = thaiDate.join(" ");
      return thaiDate;
    },

    formatTime(date) {
      const d = new Date(date).toUTCString();
      const time = d.split(" ")[4].split(":");
      return `${time[0]}:${time[1]} น.`;
    }
  }
};
</script>
<style lang="scss"></style>
